package com.neptune.voyeur.job.thread;

import java.io.IOException;
import java.util.UUID;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.xml.bind.ValidationException;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import com.neptune.templates.microservice.client.RESTClient;
import com.neptune.templates.microservice.dao.HibernateDAO;
import com.neptune.voyeur.job.dao.JobDAO;
import com.neptune.voyeur.job.domain.Job;
import com.neptune.voyeur.job.extractor.Extractor;
import com.neptune.voyeur.value.client.ValueRESTClient;
import com.neptune.voyeur.value.domain.Value;
import com.neptune.voyeur.watcher.domain.Watcher;
import com.neptune.watcher.client.WatcherRESTClient;

@Stateless
public class JobThread implements Runnable {
	final static Logger logger = LogManager.getLogger(JobThread.class);

	@Inject
	@HibernateDAO
	JobDAO jobs;

	@Inject
	@RESTClient
	WatcherRESTClient watchers;

	@Inject
	@RESTClient
	ValueRESTClient values;
	

	private Job job;
	private final UUID key;

	@Inject
	public JobThread() {
		key = UUID.randomUUID();
	}

	public Job getJob() {
		return job;
	}

	public void setJob(Job job) {
		this.job = job;
		job.setThreadId(key);
	}

	public UUID getKey() {
		return key;
	}

	public void run() {

		// If there is no job, nothing to do so it just die quietly
		if (this.job == null) {
			logger.warn("Thread just died for nothing (without job), key "
					+ key);
			return;
		}
		logger.info("Running thread job with key " + key + " for the job "
				+ job.getResourceId());

		
		job.setStatus(Job.Status.RUNNING);
		job = jobs.modify(job);
		
		Watcher watcher = new Watcher();
		try {
			watcher.setResourceId(this.job.getWatcherId());
		} catch (ValidationException e1) { }

		//TODO: could change to update or modify. Today, to change the jobId, create a new Queue element...
		// Get the watcher for target and selector
		watcher = watchers.retrieve(watcher);

		String data = "";
		
		try {
			Extractor extractor = new Extractor(watcher.getTarget(), watcher.getSelector());			
	    	data = extractor.request().extract();	    	
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    	
		Value value = new Value();
		value.setValue(data);
		value.setWatcherId(watcher.getResourceId());
		
		// Put a new value
		values.create(value);

		
		job.setStatus(Job.Status.FREE);
		job.setThreadId(null);
		job.setWatcherId(null);
		jobs.modify(job);
		
		
		logger.info("Job thread with key " + this.key + " ended");
	}

}
