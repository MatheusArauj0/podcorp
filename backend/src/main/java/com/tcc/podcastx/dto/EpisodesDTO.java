package com.tcc.podcastx.dto;

import java.time.Instant;

import com.tcc.podcastx.entities.Episodes;
import com.tcc.podcastx.entities.File;

public class EpisodesDTO {
	
	private Long id;
	private String title;
	private String members;
	private Instant publishedAt;
	private String thumbnail;
	private String description;
	private FileDTO file;
	
	public EpisodesDTO() {
		
	}

	public EpisodesDTO(Long id, String title, String members, Instant publishedAt, String thumbnail,
			String description) {
		this.id = id;
		this.title = title;
		this.members = members;
		this.publishedAt = publishedAt;
		this.thumbnail = thumbnail;
		this.description = description;
		
	}
	
	public EpisodesDTO(Episodes entity) {
		this.id = entity.getId();
		this.title = entity.getTitle();
		this.members = entity.getMembers();
		this.publishedAt = entity.getPublishedAt();
		this.thumbnail = entity.getThumbnail();
		this.description = entity.getDescription();
		this.file = new FileDTO();
		this.file.setId(entity.getFile().getId());
		this.file.setUrl(entity.getFile().getUrl());
		this.file.setType(entity.getFile().getType());
		this.file.setDuration(entity.getFile().getDuration());
		
	
	}
	
	public EpisodesDTO(Episodes entity, File file) {
		this(entity);
		new FileDTO(file);
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getMembers() {
		return members;
	}

	public void setMembers(String members) {
		this.members = members;
	}

	public Instant getPublishedAt() {
		return publishedAt;
	}

	public void setPublishedAt(Instant publishedAt) {
		this.publishedAt = publishedAt;
	}

	public String getThumbnail() {
		return thumbnail;
	}

	public void setThumbnail(String thumbnail) {
		this.thumbnail = thumbnail;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public FileDTO getFile() {
		return file;
	}

	public void setFile(FileDTO file) {
		this.file = file;
	}


	
	
	
	
}
