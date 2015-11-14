package com.neptune.voyeur.job.client;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import javax.ws.rs.client.Entity;
import javax.ws.rs.client.WebTarget;
import javax.ws.rs.core.MediaType;

import com.neptune.templates.microservice.client.ClientTemplateREST;
import com.neptune.templates.microservice.client.RESTClient;
import com.neptune.voyeur.job.dao.JobDAO;
import com.neptune.voyeur.job.domain.Job;

@RESTClient
public class JobRESTClient extends ClientTemplateREST<Job> implements JobDAO {

	@Inject
	public JobRESTClient() {
		super();
	} 

	@PostConstruct
	protected void postConstruct() {
		//TODO: must read it from a properties
		this.initialize("http://api.voyeur.neptune.li", "jobs/{id}");
	}

	public Job free(Job job) {
		WebTarget targetRequest = this.getWebtarget().resolveTemplate("id", "free");
		
		Job entity = targetRequest.request(MediaType.APPLICATION_JSON_TYPE).
				post(Entity.entity(job, MediaType.APPLICATION_JSON_TYPE), this.getPersistentClass()); 
		
		return entity;
	}

	@Override
	public void run(Job job) {
		// TODO Auto-generated method stub
		
	}
}