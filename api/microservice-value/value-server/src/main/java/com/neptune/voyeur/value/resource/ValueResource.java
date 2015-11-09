package com.neptune.voyeur.value.resource;

import java.util.LinkedList;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import com.neptune.templates.microservice.dao.Filter;
import com.neptune.templates.microservice.resource.ResourceTemplate;
import com.neptune.voyeur.value.domain.Value;
import com.neptune.voyeur.value.service.ValueService;

@Path("/watchers/{watcherId : \\d+}/values")
public class ValueResource extends ResourceTemplate<Value> {

	@Inject
	ValueService service;
	
	@PathParam("watcherId")
	String watcherId;
	
	@PostConstruct
	public void setFilters() {
		LinkedList<Filter> filters = new LinkedList<>(); 
		filters.add(new Filter(Filter.Operation.EQUAL, "watcherId", watcherId));
		
		service.getDAO().getFilters().addAll(filters);
	}
	
	@Override
	public ValueService getService() {
		return service;
	}
	
	@GET
	@Path("/last")
	public Response last() {
		Value last = this.service.last();
    	return Response.status(Status.OK).entity(last).build();
	}
}