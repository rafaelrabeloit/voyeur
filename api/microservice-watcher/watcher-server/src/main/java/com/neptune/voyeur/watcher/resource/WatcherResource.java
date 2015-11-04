package com.neptune.voyeur.watcher.resource;

import javax.inject.Inject;
import javax.ws.rs.Path;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import com.neptune.templates.microservice.resource.ResourceTemplate;
import com.neptune.voyeur.watcher.domain.Watcher;
import com.neptune.voyeur.watcher.service.WatcherService;

@Path("/watchers")
public class WatcherResource extends ResourceTemplate<Watcher> {

	@Inject
	WatcherService service;
	
	@Override
	public WatcherService getService() {
		return service;
	}
	
    public Response edit(Watcher entity) {
    	
    	entity = this.getService().update(entity);

		return Response.status(Status.OK).entity(entity).build();

    }

}