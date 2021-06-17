package com.tcc.podcastx.dto;

import java.io.Serializable;

import com.tcc.podcastx.entities.File;

public class FileDTO implements Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Long id;
	private String url;
	private String type;
	private Integer duration;
	
	public FileDTO() {
		
	}
	

	public FileDTO(Long id, String url, String type, Integer duration) {
		this.id = id;
		this.url = url;
		this.type = type;
		this.duration = duration;
	}
	
	public FileDTO(File file) {
		this.id = file.getId();
		this.url = file.getUrl();
		this.type = file.getType();
		this.duration = file.getDuration();
	}



	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public Integer getDuration() {
		return duration;
	}

	public void setDuration(Integer duration) {
		this.duration = duration;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		FileDTO other = (FileDTO) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}
	
	
}
