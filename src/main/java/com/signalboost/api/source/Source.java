package com.signalboost.api.source;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.signalboost.api.user.User;

@Entity
@Table(name="source")
public class Source {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String title;
	private String content;
	private double latitude;
	private double longitude;
	private int urgancy;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="primary_id")
	private User user;
	
	public Source(String title, String content) {
		this.title = title;
		this.content = content;
	}
}
