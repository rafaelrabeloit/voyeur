package com.neptune.voyeur.job.domain;

import java.util.List;
import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.ws.rs.core.Link;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;
import javax.xml.bind.annotation.adapters.XmlJavaTypeAdapter;

import org.glassfish.jersey.linking.InjectLink;
import org.glassfish.jersey.linking.InjectLink.Style;
import org.glassfish.jersey.linking.InjectLinks;

import com.neptune.templates.microservice.adapter.ListLinkAdapter;
import com.neptune.templates.microservice.domain.DomainTemplate;


/**
 * Job model
 * @author Rafael Rabelo
 */
@Entity
@Table(name = "_jobs")
@XmlRootElement
public class Job extends DomainTemplate implements java.io.Serializable {
	
	public enum Status {
		FREE, RUNNING, DISABLED, ALIVE, DEAD
	}
	
	private static final long serialVersionUID = 1L;

	@InjectLinks({
		@InjectLink(value="/jobs/${instance.resourceId}", rel = "self", style=Style.RELATIVE_PATH),
		@InjectLink(value="/jobs/${instance.resourceId}/watcher", rel = "watcher", style=Style.RELATIVE_PATH,
			    condition="${instance.watcherId != null}")
		})
	@XmlElement(name = "_links")
	@XmlJavaTypeAdapter(ListLinkAdapter.class)
	private List<Link> links;

	
	private Integer id;
	private String randomId;
	
	private UUID threadKey;
	private Status status;

	private String watcherId;
	
	
	public Job() {
		super();
	}

	public Job(Integer id, String randomId, UUID threadKey, Status status, String watcherId) {
		super();
		
		this.id = id;
		this.randomId = randomId;
		this.threadKey = threadKey;
		this.status = status;
		this.watcherId = watcherId;
		
	}


	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id", unique = true, nullable = false, updatable = false)
	@XmlTransient
	@Override
	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}
	
	@Column(name = "random_id", unique = false, nullable = false, updatable = false, length = 7)
	@XmlTransient
	@Override
	public String getRandomId() {
		return this.randomId;
	}

	public void setRandomId(String randomId) {
		this.randomId = randomId;
	}
	
	@Column(name = "thread_key", unique = true, nullable = true, length = 16)
	@XmlElement(name = "thread_key")
	public UUID getThreadId() {
		return threadKey;
	}

	public void setThreadId(UUID threadId) {
		this.threadKey = threadId;
	}

	@Enumerated(EnumType.ORDINAL)
	@Column(name = "status", nullable = false)
	public Status getStatus() {
		return status;
	}

	public void setStatus(Status status) {
		this.status = status;
	}

	@Column(name = "watcher_id", unique = true, nullable = true, length = 18)
	@XmlElement(name = "watcher")
	public String getWatcherId() {
		return watcherId;
	}

	public void setWatcherId(String watcherId) {
		this.watcherId = watcherId;
	}	
}
