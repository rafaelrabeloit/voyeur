package com.neptune.voyeur.watcher.domain;

import java.text.ParseException;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.ws.rs.core.Link;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;
import javax.xml.bind.annotation.adapters.XmlJavaTypeAdapter;

import org.glassfish.jersey.linking.InjectLink;
import org.glassfish.jersey.linking.InjectLink.Style;
import org.glassfish.jersey.linking.InjectLinks;
import org.joda.time.DateTime;
import org.joda.time.DateTimeZone;

import com.google.ical.compat.jodatime.DateTimeIterable;
import com.google.ical.compat.jodatime.DateTimeIterator;
import com.google.ical.compat.jodatime.DateTimeIteratorFactory;
import com.neptune.templates.microservice.adapter.ListLinkAdapter;
import com.neptune.templates.microservice.domain.DomainTemplate;


/**
 * Job model
 * @author Rafael Rabelo
 */
@Entity
@Table(name = "_watchers")
@XmlRootElement
public class Watcher extends DomainTemplate implements java.io.Serializable {

	private static final long serialVersionUID = 1L;

	@InjectLinks({
		@InjectLink(value="/watchers/${instance.resourceId}", rel = "self", style=Style.RELATIVE_PATH),
		@InjectLink(value="/watchers/${instance.resourceId}/values", rel = "values", style=Style.RELATIVE_PATH)
		})
	@XmlElement(name = "_links")
	@XmlJavaTypeAdapter(ListLinkAdapter.class)
	private List<Link> links;

	
	private Integer id;
	private String randomId;
	
	private String name;
	private String description;
	
	private String selector;
	private String target;
	private String recurrence;
	
	private Boolean enabled;
	
	private Date ocorrence;
	private Date foreseen;
	
	
	public Watcher() {
		super();
	}

	public Watcher(Integer id, String randomId, String jobId) {
		super();
		
		this.id = id;
		this.randomId = randomId;
		
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

	@Column(name = "name", nullable = false, length = 127)
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Column(name = "description", nullable = true, length = 511)
	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	@Column(name = "selector", nullable = false, length = 255)
	public String getSelector() {
		return selector;
	}

	public void setSelector(String selector) {
		this.selector = selector;
	}

	@Column(name = "target", nullable = false, length = 255)
	public String getTarget() {
		return target;
	}

	public void setTarget(String target) {
		this.target = target;
	}

	@Column(name = "recurrence", nullable = false, length = 255)
	public String getRecurrence() {
		return recurrence;
	}

	public void setRecurrence(String recurrence) {
		this.recurrence = recurrence;
	}

	@Column(name = "enabled", nullable = false)
	public Boolean getEnabled() {
		return enabled;
	}

	public void setEnabled(Boolean enabled) {
		this.enabled = enabled;
	}

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "foreseen", nullable = false)
	public Date getForeseen() {
		return foreseen;
	}
	
	public void setForeseen(Date foreseen) { 
		if (foreseen != null) {
			this.foreseen = foreseen;
		}
	}

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "ocorrence", nullable = false)
	public Date getOcorrence() {
		if (this.ocorrence == null) {
			this.ocorrence = new Date();
			this.ocorrence.setSeconds(0);
		}
		return this.ocorrence;
	}

	public void setOcorrence(Date ocorrence) {
		this.ocorrence = ocorrence;
	}

	public Watcher invalidate() {
		this.foreseen = null;
		this.ocorrence = null;
		return this;
	}
	
	//TODO: Treat parse exception
	public void foresee() {
		DateTime base =	new DateTime(this.getOcorrence());
		
		if (this.foreseen != null && this.foreseen.getTime() > DateTime.now().getMillis() )
			//if the foreseen time is still to come, then it is still valid
			return;
		
		if (this.recurrence != null) {
		    try {
		        DateTimeIterable range = DateTimeIteratorFactory.createDateTimeIterable(this.recurrence, base, DateTimeZone.UTC, true);
		        DateTimeIterator it = range.iterator();
		     
		        base = null;
		        while (it.hasNext()) {
		        	base = it.next();
		        	if (base != null && !base.isBeforeNow()) break;
		        }
		        
		        if (base != null) {
		        	if (this.foreseen != null)
		        		this.ocorrence = this.foreseen;
		        	
		        	this.foreseen = new Date(base.getMillis());
		        } else {
			        // If there is NOT another iteration for this watcher, then disable it!
		        	this.enabled = false;
		        }
		    } 
		    catch (ParseException e) {
		    	System.out.print(e);
		    }
		}
	}	
}
