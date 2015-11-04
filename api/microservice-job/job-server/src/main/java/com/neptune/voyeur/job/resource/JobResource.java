package com.neptune.voyeur.job.resource;

import javax.inject.Inject;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import com.neptune.templates.microservice.resource.ResourceTemplate;
import com.neptune.voyeur.job.domain.Job;
import com.neptune.voyeur.job.service.JobService;

@Path("/jobs")
public class JobResource extends ResourceTemplate<Job> {

	@Inject
	JobService service;
	
	@Override
	public JobService getService() {
		return service;
	}

	@POST
    @Path("/free")
	public Response free(Job job) {
		job = this.service.free(job);
    	return Response.status(Status.OK).entity(job).build();
	}
}