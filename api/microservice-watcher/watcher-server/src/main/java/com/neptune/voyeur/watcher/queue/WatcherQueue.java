package com.neptune.voyeur.watcher.queue;

import java.io.IOException;
import java.util.concurrent.TimeUnit;

import javax.inject.Inject;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import com.neptune.templates.microservice.queue.CuratorQueue;
import com.neptune.templates.microservice.queue.QueueTemplateCurator;
import com.neptune.templates.microservice.queue.SingleQueue;
import com.neptune.voyeur.watcher.dao.WatcherDAO;
import com.neptune.voyeur.watcher.domain.Watcher;

@CuratorQueue
public class WatcherQueue extends QueueTemplateCurator<Watcher> implements
		WatcherDAO  {
	final static Logger logger = LogManager
			.getLogger(WatcherQueue.class);
	
	private SingleQueue<Watcher> singleQueue;

	/**
	 * Ensure that this is called, because it sets the parameter for reflection!
	 * 
	 * @throws IOException
	 */
	@Inject
	public WatcherQueue() throws IOException {
		super();
	}

	@Override
	public Watcher create(Watcher entity) {
		try {
			this.getSingleQueue().getQueue().put(entity, entity.getForeseen().getTime());
			this.getSingleQueue().getQueue().flushPuts(100, TimeUnit.MILLISECONDS);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return entity;
	}

	@Override
	public SingleQueue<Watcher> getSingleQueue() {
		return this.singleQueue;
	}
	
	public void setSingleQueue(SingleQueue<Watcher> singleQueue) {
		this.singleQueue = singleQueue;
	}
}
