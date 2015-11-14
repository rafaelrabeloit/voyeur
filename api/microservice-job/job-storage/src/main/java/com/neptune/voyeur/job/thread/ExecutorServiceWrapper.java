package com.neptune.voyeur.job.thread;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import javax.inject.Singleton;

@Singleton
public class ExecutorServiceWrapper {

	private final ExecutorService pool;

	public ExecutorService getPool() {
		return pool;
	}
	
	public ExecutorServiceWrapper() {
		this.pool = Executors.newCachedThreadPool(new JobThreadFactory());
	}
}
