package com.signalboost.api.source;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

@Service
public class SourceService {
	private final SourceRepository sourceRepo;
	
	public SourceService(SourceRepository sourceRepo) {
		this.sourceRepo = sourceRepo;
	}
	
	public Source createSource(Source source) {
		return sourceRepo.save(source);
	}
	
	public List<Source> findAllSources() {
		return sourceRepo.findAll();
	}
	
	public Source findSource(Long id) {
		Optional<Source> source = sourceRepo.findById(id);
		if(source.isPresent()) {
			return source.get(); 
		} else {
			return null;
		}
	}
}
