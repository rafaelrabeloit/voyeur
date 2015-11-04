package com.neptune.watcher.client;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import javax.ws.rs.client.Entity;
import javax.ws.rs.client.WebTarget;
import javax.ws.rs.core.MediaType;

import com.neptune.templates.microservice.client.ClientTemplateREST;
import com.neptune.templates.microservice.client.RESTClient;
import com.neptune.voyeur.watcher.dao.WatcherDAO;
import com.neptune.voyeur.watcher.domain.Watcher;

@RESTClient
public class WatcherRESTClient extends ClientTemplateREST<Watcher> implements WatcherDAO {

	@Inject
	public WatcherRESTClient() {
		super();
	} 

	@PostConstruct
	protected void postConstruct() {
		//TODO: must read it from a properties
		this.initialize("http://api.voyeur.neptune.li", "watchers/{id}");
	}

	public Watcher updateNext(Watcher watcher) {
		WebTarget targetRequest = this.getWebtarget().path("next");
		
		Watcher entity = targetRequest.request(MediaType.APPLICATION_JSON_TYPE).
				put(Entity.entity(watcher, MediaType.APPLICATION_JSON_TYPE), this.getPersistentClass()); 
		
		return entity;
	}

	public Watcher retrieveNext() {
		return null;
	}
}