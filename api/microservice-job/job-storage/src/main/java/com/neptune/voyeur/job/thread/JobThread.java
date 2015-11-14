package com.neptune.voyeur.job.thread;

import java.io.IOException;
import java.util.UUID;

import javax.xml.bind.ValidationException;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import com.neptune.voyeur.job.dao.JobDAO;
import com.neptune.voyeur.job.domain.Job;
import com.neptune.voyeur.job.extractor.Extractor;
import com.neptune.voyeur.value.dao.ValueDAO;
import com.neptune.voyeur.value.domain.Value;
import com.neptune.voyeur.watcher.dao.WatcherDAO;
import com.neptune.voyeur.watcher.domain.Watcher;

public class JobThread implements Runnable {
	final static Logger logger = LogManager.getLogger(JobThread.class);

	JobDAO jobs;

	WatcherDAO watchers;

	ValueDAO values;
	
	Job job;

	private UUID key;

	public JobThread(JobDAO jobs, WatcherDAO watchers, ValueDAO values) {
		super();
		this.jobs = jobs;
		this.watchers = watchers;
		this.values = values;
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

		logger.info("Running thread job with key " + job.getThreadId() + " for the job "
				+ job.getResourceId());

		
		job.setStatus(Job.Status.RUNNING);
		jobs.modify(job);
		
		Watcher watcher = new Watcher();
		try {
			watcher.setResourceId(job.getWatcherId());
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


		logger.info("Job thread with key " + job.getThreadId() + " ended");
		
		job.setStatus(Job.Status.FREE);
		job.setThreadId(null);
		job.setWatcherId(null);
		jobs.update(job);		
	}

}
