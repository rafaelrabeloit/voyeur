package com.neptune.voyeur.watcher.dao;

import javax.inject.Inject;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import com.neptune.templates.microservice.dao.DAOTemplateHibernate;
import com.neptune.templates.microservice.dao.HibernateDAO;
import com.neptune.voyeur.watcher.domain.Watcher;

@HibernateDAO
public class WatcherDAOImpl extends DAOTemplateHibernate<Watcher> implements WatcherDAO  {
	final static Logger logger = LogManager.getLogger(WatcherDAOImpl.class);

	@Inject
	public WatcherDAOImpl() {
		super();
	}
}
