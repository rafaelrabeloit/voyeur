package com.neptune.voyeur.job.dao;

import com.neptune.templates.microservice.dao.DAOTemplate;
import com.neptune.voyeur.job.domain.Job;

public interface JobDAO extends DAOTemplate<Job> {
	public Job free(Job job);
}