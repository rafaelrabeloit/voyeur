package com.neptune.voyeur.watcher.domain;

import java.text.ParseException;

import junit.framework.TestCase;

import org.joda.time.DateTime;
import org.joda.time.DateTimeUtils;
import org.junit.Test;


public class WatcherTest extends TestCase {

	public WatcherTest() {
	}

	@Test
	public void test_foresee_simple() throws ParseException {

		Watcher watcher = new Watcher();

		watcher.setRecurrence("RRULE:FREQ=MINUTELY;");
		watcher.foresee();
				
		assertEquals(
				DateTime.now().plusMinutes(1).withMillisOfSecond(0).withSecondOfMinute(0).toString(),
				new DateTime(watcher.getForeseen()).toString());

	}

	@Test
	public void test_foresee_interval() throws ParseException {

		Watcher watcher = new Watcher();

		watcher.setRecurrence("RRULE:INTERVAL=2;FREQ=MINUTELY;");
		watcher.foresee();
				
		assertEquals(
				DateTime.now().plusMinutes(2).withMillisOfSecond(0).withSecondOfMinute(0).toString(),
				new DateTime(watcher.getForeseen()).toString());

	}

	@Test
	public void test_foresee_intervalBy2WithOcurrence() throws ParseException {

		Watcher watcher = new Watcher();

		watcher.setOcorrence(DateTime.now().minusMinutes(1).withMillisOfSecond(0).withSecondOfMinute(0).toDate());
		watcher.setRecurrence("RRULE:INTERVAL=2;FREQ=MINUTELY;");
		watcher.foresee();
				
		assertEquals(
				DateTime.now().plusMinutes(1).withMillisOfSecond(0).withSecondOfMinute(0).toString(),
				new DateTime(watcher.getForeseen()).toString());

		DateTimeUtils.setCurrentMillisOffset(1 * 60 * 1000);
		watcher.foresee();

		assertEquals(
				DateTime.now().withMillisOfSecond(0).withSecondOfMinute(0).toString(),
				new DateTime(watcher.getOcorrence()).toString());
		
		assertEquals(
				DateTime.now().plusMinutes(2).withMillisOfSecond(0).withSecondOfMinute(0).toString(),
				new DateTime(watcher.getForeseen()).toString());
	}
}