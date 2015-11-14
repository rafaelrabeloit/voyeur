package com.neptune.voyeur.job.dao;

import javax.inject.Inject;

import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.criterion.Restrictions;

import com.neptune.templates.microservice.dao.DAOTemplateHibernate;
import com.neptune.templates.microservice.dao.HibernateDAO;
import com.neptune.templates.microservice.dao.util.HibernateUtil;
import com.neptune.voyeur.job.domain.Job;
import com.neptune.voyeur.job.thread.ExecutorServiceWrapper;
import com.neptune.voyeur.job.thread.JobThread;
import com.neptune.voyeur.value.dao.ValueDAO;
import com.neptune.voyeur.watcher.dao.WatcherDAO;

@HibernateDAO
public class JobDAOImpl extends DAOTemplateHibernate<Job> implements JobDAO  {

    @Inject
    ExecutorServiceWrapper executorService;

	@Inject @HibernateDAO
	WatcherDAO watchers;

	@Inject @HibernateDAO
	ValueDAO values;
	
	@Inject
	public JobDAOImpl() {
		super();
	}

	@Override
	public Job free(Job job) {
		Session session = HibernateUtil.getSessionFactory().openSession();

		Transaction tx = null;
		Job free = null;
		try {
			tx = session.beginTransaction();

		    free = (Job) session.createCriteria(Job.class)
					.add(Restrictions.eq("status", Job.Status.FREE))
					.add(Restrictions.isNull("watcherId"))
				    .setMaxResults(1)
				    .uniqueResult();
			
			if (free != null) {			
				free.setWatcherId(job.getWatcherId());

				session.saveOrUpdate(free);
				
				job.copy(free);
			}
			
			tx.commit();
		} catch (RuntimeException e) {
			tx.rollback();
			throw e;
		} finally {
			session.close();
		}

		return job;
	}

	
	@Override
	public void run(Job job) {
		JobThread thread = new JobThread(this, watchers, values);
		thread.setJob(job);
		executorService.getPool().execute(thread);
	}
	
}
