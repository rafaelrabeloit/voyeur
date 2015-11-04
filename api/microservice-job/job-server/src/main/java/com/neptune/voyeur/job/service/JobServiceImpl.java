package com.neptune.voyeur.job.service;

import javax.ejb.Stateless;
import javax.inject.Inject;

import com.neptune.templates.microservice.dao.HibernateDAO;
import com.neptune.templates.microservice.service.ServiceTemplateImpl;
import com.neptune.voyeur.job.dao.JobDAO;
import com.neptune.voyeur.job.domain.Job;
import com.neptune.voyeur.job.thread.ExecutorServiceWrapper;
import com.neptune.voyeur.job.thread.JobThread;

@Stateless
public class JobServiceImpl extends ServiceTemplateImpl<Job> implements JobService  {

    @Inject @HibernateDAO
    JobDAO dao;

    @Inject
    JobThread runnable;
    
    @Inject
    ExecutorServiceWrapper executorService;
    
    @Inject
    public JobServiceImpl() {
    	super();
	}

	@Override
	public JobDAO getDAO() {
		return dao;
	}
	
	/**
	 * Create a new Job.
	 * When creating a new Job, setup a new Runnable and associate it with the Job
	 */
	@Override
	public Job create(Job entity) {

		check(entity);	
		
		entity = super.create(entity);

		// If a Job was set to this runnable, it should be started
		if (runnable.getJob() != null)
			executorService.getPool().execute(runnable);
		
		return entity;
	}

	@Override
	public Job update(Job entity) {
		check(entity, dao.retrieve(entity));
		
		entity = super.update(entity);
		
		// If a Job was set to this runnable, it should be started
		if (runnable.getJob() != null)
			executorService.getPool().execute(runnable);
		
		return entity;
	}

	@Override
	public Job free(Job entity) {

		check(entity);
		
		entity = dao.free(entity);
		
		// If a Job was set to this runnable, it should be started. The only situation in where the entity can be null
		if (entity != null && runnable.getJob() != null)
			executorService.getPool().execute(runnable);
		
		return entity;
	}
	
	public void check(Job job) {
		this.check(job, null);
	}
	
	/**
	 * Update the Job
	 * It will update the ThreadId to null (stopping all processes of this job) if:
	 *     The Job is now DISABLED
	 * It will spawn a new Thread if:
	 *     The watcher changes, so the old thread can die
	 *     The old status was DEAD and the new one is ALIVE
	 * 
	 * ATTENTION, this is raced condition and will work only because the system is fault tolerant to his Jobs status :)
	 */
	public void check(Job newJob, Job oldJob) {
		
		// Check if status is DISABLED
		if (newJob.getStatus() == Job.Status.DISABLED) {
			newJob.setThreadId(null);
		} 
		// Check if it is changing the Watcher
		else if ( (oldJob == null && newJob.getWatcherId() != null) || (oldJob != null && oldJob.getWatcherId() == null) ) { 
			runnable.setJob(newJob);
		}
		
	}
}
