package com.neptune.voyeur.config;

import javax.ws.rs.ApplicationPath;

import org.glassfish.jersey.linking.DeclarativeLinkingFeature;
import org.glassfish.jersey.server.ResourceConfig;

import com.neptune.voyeur.watcher.queue.ApplicationEventHandler;

@ApplicationPath("/")
public class ApplicationConfig extends ResourceConfig {

	public ApplicationConfig() {
		super();
		this.packages("com.neptune.templates.microservice;com.neptune.voyeur;")
			.register(DeclarativeLinkingFeature.class)
			.register(ApplicationEventHandler.class)
			.register(CORSResponseFilter.class)
			.register(BasicAuthFilter.class)
			.setApplicationName("Voyeur");
	}
}