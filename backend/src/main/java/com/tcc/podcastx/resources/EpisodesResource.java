package com.tcc.podcastx.resources;

import java.net.URI;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.tcc.podcastx.dto.EpisodesDTO;
import com.tcc.podcastx.services.EpisodesService;
import com.tcc.podcastx.storage.Disco;

@RestController
@RequestMapping("/episodes")
public class EpisodesResource {
	
	@Autowired
	EpisodesService service;
	
	@Autowired
	Disco disco;

	@GetMapping
	public ResponseEntity<Page<EpisodesDTO>> findAll(Pageable pageable) {
		Page<EpisodesDTO> list = service.findAllPaged(pageable);
		return ResponseEntity.ok().body(list);
	}
	
	@GetMapping(value="/{id}")
	public ResponseEntity<EpisodesDTO> findById(@PathVariable Long id){
		EpisodesDTO dto = service.findById(id);
		return ResponseEntity.ok().body(dto);
	}
	
	@PostMapping
	public ResponseEntity<EpisodesDTO> insert(@RequestBody EpisodesDTO dto){
		dto = service.insert(dto);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(dto.getId()).toUri();
		return ResponseEntity.created(uri).body(dto);
	}
	
	@PostMapping("/fotos")
	public void uploadFoto(@RequestParam MultipartFile foto) {
		disco.salvarFoto(foto);
	}
	
	@PostMapping("/audios")
	public void uploadAudio(@RequestParam MultipartFile audio) {
		disco.salvarAudio(audio);
	}
	
}
