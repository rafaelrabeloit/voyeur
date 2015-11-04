package com.neptune.voyeur.value.service;

import javax.ejb.Stateless;
import javax.inject.Inject;

import com.neptune.templates.microservice.dao.HibernateDAO;
import com.neptune.templates.microservice.service.ServiceTemplateImpl;
import com.neptune.voyeur.value.dao.ValueDAO;
import com.neptune.voyeur.value.domain.Value;

@Stateless
public class ValueServiceImpl extends ServiceTemplateImpl<Value> implements ValueService  {

    @Inject @HibernateDAO
    ValueDAO dao;
    
    @Inject
    public ValueServiceImpl() {
    	super();
	}

	@Override
	public ValueDAO getDAO() {
		return dao;
	}

	@Override
	public Value last() {
		return dao.last();
	}
		
}
