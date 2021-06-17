package com.tcc.podcastx.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tcc.podcastx.entities.File;

@Repository
public interface FileRepository extends JpaRepository<File, Long> {

}
