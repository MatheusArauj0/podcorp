package com.tcc.podcastx.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tcc.podcastx.dto.EpisodesDTO;
import com.tcc.podcastx.entities.Episodes;
import com.tcc.podcastx.entities.File;
import com.tcc.podcastx.repository.EpisodesRepository;
import com.tcc.podcastx.services.exceptions.ResourceNotFoundException;

@Service
public class EpisodesService {
	
	@Autowired
	private EpisodesRepository repository;
	
	@Transactional(readOnly = true)
	public Page<EpisodesDTO> findAllPaged(Pageable pageable) {
		Page<Episodes> list = repository.findAll(pageable);
		return  list.map(x -> new EpisodesDTO(x));
	}

	@Transactional(readOnly = true)
	public EpisodesDTO findById(Long id) {
		Optional<Episodes> ep = repository.findById(id);
		Episodes entity = ep.orElseThrow(() -> new ResourceNotFoundException("Entity not found"));
		return new EpisodesDTO(entity);
	}
	
	
	@Transactional
	public EpisodesDTO insert(EpisodesDTO dto) {
		Episodes entity = new Episodes();
		File file = new File();
		entity.setTitle(dto.getTitle());
		entity.setMembers(dto.getMembers());
		entity.setPublishedAt(dto.getPublishedAt());
		entity.setThumbnail(dto.getThumbnail());
		entity.setDescription(dto.getDescription());
		file.setUrl(dto.getFile().getUrl());
		file.setType(dto.getFile().getType());
		file.setDuration(dto.getFile().getDuration());
		entity.setFile(file);
		entity = repository.save(entity);
		return new EpisodesDTO(entity);
	}
}
