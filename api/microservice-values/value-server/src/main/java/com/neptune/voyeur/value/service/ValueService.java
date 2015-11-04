package com.neptune.voyeur.value.service;

import com.neptune.templates.microservice.service.ServiceTemplate;
import com.neptune.voyeur.value.domain.Value;

public interface ValueService extends ServiceTemplate<Value> {

	Value last();

}