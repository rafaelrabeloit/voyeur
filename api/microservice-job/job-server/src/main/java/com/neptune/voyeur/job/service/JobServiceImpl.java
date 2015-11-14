package com.neptune.voyeur.job.service;

import javax.ejb.Stateless;
import javax.inject.Inject;

import com.neptune.templates.microservice.dao.HibernateDAO;
import com.neptune.templates.microservice.service.ServiceTemplateImpl;
import com.neptune.voyeur.job.dao.JobDAO;
import com.neptune.voyeur.job.domain.Job;

@Stateless
public class JobServiceImpl extends ServiceTemplateImpl<Job> implements JobService  {

    @Inject @HibernateDAO
    JobDAO dao;
    
    @Inject
    public JobServiceImpl() {
    	super();
	}

	@Override
	public JobDAO getDAO() {
		return dao;
	}

	@Override
	public Job free(Job entity) {

		entity = dao.free(entity);
		
		return entity;
	}
}
