package com.signalboost.api.source;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

public interface SourceRepository extends CrudRepository<Source, Long>{
	List<Source> findAll();
}
