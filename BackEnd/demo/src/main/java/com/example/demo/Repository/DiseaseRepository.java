package com.example.demo.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.Entity.Disease;

@Repository
public interface DiseaseRepository extends JpaRepository<Disease,Integer> {
    
}