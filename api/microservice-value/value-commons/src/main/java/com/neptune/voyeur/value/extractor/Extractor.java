package com.neptune.voyeur.value.extractor;

import java.io.IOException;
import javax.json.Json;
import javax.json.JsonArrayBuilder;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

/**
 * Extract a value from a HTML document using a CSS selector
 * It will *get* the page if only the URL is provided
 * The result is a json
 * 
 *  TODO: Shouldn't this get be parameterized? Could it be a post with body for auth requests...
 * @author vntrait
 *
 */
public class Extractor {
	
	private String selector;
	private String target;
	private Document document;

	/**
	 * Build the Extractor providing only the target's url
	 * @param target URL to target
	 * @param selector the selector that will provide the element
	 */
	public Extractor(String target, String selector) {
		this.target = target;
		this.selector = selector;
	}

	/**
	 * Build the Extractor using a document that had been already requested  
	 * @param document the html document
	 * @param selector the selector that will provide the element
	 */
	public Extractor(Document document, String selector) {
		this.document = document;
		this.selector = selector;
	}
	
	/**
	 * Request the @target
	 * @return itself for linked calls 
	 * @throws IOException
	 */
	public Extractor request() throws IOException {
		this.document = Jsoup.connect(this.target).get();
		return this;
	}
	
	/**
	 * Extract the value based on the @target and @selector
	 * @return json representation of the value
	 */
	public String extract() {
        JsonArrayBuilder json = Json.createArrayBuilder();
		
		Elements els = this.document.select(this.selector);
		for (Element el: els) {
			this.process(el, json);
		}
		
		return json.build().toString();
	}

	/**
	 * Process, recursively, the element @el into a @list 
	 * @param el the actual root node of the DOM
	 * @param list the json array where this element should be added
	 */
	private void process(Element el, JsonArrayBuilder list) {
		if (el.children().size() == 0) {
			if (el.ownText().trim().length() != 0) {
				list.add(el.ownText().trim());
			}
		}
		else {
			for (Element ec: el.children()) {
				JsonArrayBuilder ch = Json.createArrayBuilder();

				// This comes first because .build() happens on .add()  ;)
				this.process(ec, ch);
				
				if (el.ownText().trim().length() == 0) {
					list.add(ch);
				} else {
					list.add(el.ownText().trim());				
				}				
			}
		}
	}
}