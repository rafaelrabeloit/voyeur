package com.neptune.voyeur.watcher.service;

import java.util.Date;

import javax.annotation.PostConstruct;
import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.inject.Singleton;
import javax.xml.bind.ValidationException;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import com.neptune.templates.microservice.dao.HibernateDAO;
import com.neptune.templates.microservice.queue.CuratorQueue;
import com.neptune.templates.microservice.queue.SingleQueue;
import com.neptune.templates.microservice.service.ServiceTemplateImpl;
import com.neptune.voyeur.job.dao.JobDAO;
import com.neptune.voyeur.job.domain.Job;
import com.neptune.voyeur.watcher.dao.WatcherDAO;
import com.neptune.voyeur.watcher.domain.Watcher;
import com.neptune.voyeur.watcher.queue.WatcherQueue;

@Stateless
public class WatcherServiceImpl extends ServiceTemplateImpl<Watcher> implements WatcherService  {
	final static Logger logger = LogManager.getLogger(WatcherServiceImpl.class);

    @Inject @HibernateDAO
    WatcherDAO dao;

    @Inject @CuratorQueue
    WatcherDAO queue;

	@Singleton
	static class SingleWatcherQueue extends SingleQueue<Watcher> {
		final static Logger logger = LogManager.getLogger(SingleWatcherQueue.class);

	    @Inject @HibernateDAO
	    JobDAO jobClient;

	    @Inject @HibernateDAO
	    WatcherDAO watcherDAO;

	    @Inject @CuratorQueue
	    WatcherDAO watcherQueue;

		public SingleWatcherQueue() {
			super();
		}

		@PostConstruct
		public void postConstruct() {
	    	((WatcherQueue) this.watcherQueue).setSingleQueue(this);
	    	((WatcherQueue) this.watcherQueue).init();
		}
		
		@Override
		public void consumeMessage(Watcher watcher) throws Exception {
			logger.info("Consuming Watcher " + watcher.getResourceId() + " from " + watcher.getOcorrence() + " and foreseen at " + watcher.getForeseen());
			
			Job job = new Job();
			job.setWatcherId(watcher.getResourceId());
			
			job = jobClient.free(job);
			jobClient.run(job);
			
			// No free jobs :P
			if (job != null) {
				logger.info("Free Job " + job.getResourceId());
				
				watcher.foresee();
	
				logger.info("Foreseen time for next watch: " + watcher.getForeseen());
			}
			else {
				logger.warn("No free jobs found!");
			}
			
			watcherDAO.modify(watcher);
			
			logger.info("Queue Watcher " + watcher.getResourceId());
			watcherQueue.create(watcher);
		}

		@Override
		public Watcher deserialize(byte[] bytes) {
			Watcher watcher = new Watcher();
			try {
				String data = new String(bytes);
				String properties[] = new String[4];
				
				int i = data.indexOf(' ', 0), j = data.indexOf(' ', i + 1);
				
				properties[0] = data.substring(0, i);
				properties[1] = data.substring(i + 1, j);
				
				i = data.indexOf(' ', j + 1);
				properties[2] = data.substring(j + 1, i);
				properties[3] = data.substring(i + 1);
				
				watcher.setResourceId(properties[0]);
				watcher.setOcorrence(new Date(Long.parseLong(properties[1])));
				watcher.setForeseen(new Date(Long.parseLong(properties[2])));
				watcher.setRecurrence(properties[3]);
			} catch (ValidationException e) {
				// TODO LOG THIS
			}
			return watcher;
		}

		@Override
		public byte[] serialize(Watcher watcher) {
			String toSerialize = watcher.getResourceId() + " "
					+ watcher.getOcorrence().getTime() + " " 
					+ watcher.getForeseen().getTime() + " " 
					+ watcher.getRecurrence();
			return (toSerialize).getBytes();
		}
	}
	
	@Inject
	SingleWatcherQueue singleQueue;
    
    @Inject
    public WatcherServiceImpl() {
    	super();
	}

    @PostConstruct
    public void init() {
    	((WatcherQueue) this.queue).setSingleQueue(singleQueue);
    	((WatcherQueue) this.queue).init();
    }
    
	@Override
	public WatcherDAO getDAO() {
		return dao;
	}

	@Override
	public Watcher create(Watcher entity) {
		entity.foresee();
		
		super.create(entity);
		return queue.create(entity);
	}
	
	@Override
	public Watcher update(Watcher entity) {
		if (entity.getEnabled()) {
			entity.foresee();
			queue.update(entity);
		} else {
			queue.delete(entity);
		}
		return super.update(entity);
	}
	
	@Override
	public Watcher delete(Watcher entity) {
		queue.delete(entity);
		return super.delete(entity);
	}
}
