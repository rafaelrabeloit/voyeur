package com.neptune.voyeur.job.service;

import com.neptune.templates.microservice.service.ServiceTemplate;
import com.neptune.voyeur.job.domain.Job;

public interface JobService extends ServiceTemplate<Job> {

	Job free(Job job);

}