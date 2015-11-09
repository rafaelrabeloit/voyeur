package com.neptune.voyeur.value.client;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import javax.ws.rs.client.WebTarget;

import com.neptune.templates.microservice.client.ClientTemplateREST;
import com.neptune.templates.microservice.client.RESTClient;
import com.neptune.voyeur.value.dao.ValueDAO;
import com.neptune.voyeur.value.domain.Value;

@RESTClient
public class ValueRESTClient extends ClientTemplateREST<Value> implements ValueDAO {

	@Inject
	public ValueRESTClient() {
		super();
	} 

	//TODO: Use Filters and Orders instead of this!
	
	@PostConstruct
	protected void postConstruct() {
		//TODO: must read it from a properties
		this.initialize("http://api.voyeur.neptune.li", "watchers/{watchersId}/values/{id}");
	}

	@Override
	public Value last() {
		// TODO Auto-generated method stub
		return null;
	}
	
	public Value create(Value entity) {
		WebTarget tmptarget = this.templateTarget;
		this.templateTarget = this.templateTarget.resolveTemplate("watchersId", entity.getWatcherId());
		Value value = super.create(entity);
		this.templateTarget =  tmptarget;
		return value;		
	}

	public Value retrieve(Value entity) {
		WebTarget tmptarget = this.templateTarget;
		this.templateTarget = this.templateTarget.resolveTemplate("watchersId", entity.getWatcherId());
		Value value = super.retrieve(entity);
		this.templateTarget =  tmptarget;
		return value;		
	}

	public Value update(Value entity) {
		WebTarget tmptarget = this.templateTarget;
		this.templateTarget = this.templateTarget.resolveTemplate("watchersId", entity.getWatcherId());
		Value value = super.create(entity);
		this.templateTarget =  tmptarget;
		return value;		
	}

	public Value delete(Value entity) {
		WebTarget tmptarget = this.templateTarget;
		this.templateTarget = this.templateTarget.resolveTemplate("watchersId", entity.getWatcherId());
		Value value = super.delete(entity);
		this.templateTarget =  tmptarget;
		return value;		
	}
	
	public Value modify(Value entity) {
		WebTarget tmptarget = this.templateTarget;
		this.templateTarget = this.templateTarget.resolveTemplate("watchersId", entity.getWatcherId());
		Value value = super.modify(entity);
		this.templateTarget =  tmptarget;
		return value;		
	}
	
}