package com.neptune.voyeur.value.dao;

import com.neptune.templates.microservice.dao.DAOTemplate;
import com.neptune.voyeur.value.domain.Value;

public interface ValueDAO extends DAOTemplate<Value> {

	Value last();
}