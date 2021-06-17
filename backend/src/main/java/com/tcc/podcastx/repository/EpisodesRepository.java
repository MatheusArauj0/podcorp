package com.tcc.podcastx.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tcc.podcastx.entities.Episodes;

@Repository
public interface EpisodesRepository extends JpaRepository<Episodes, Long> {

}
