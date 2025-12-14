package com.example.demo.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.Entity.Medical;
import com.example.demo.Entity.Patient;


public interface MedicalRepository extends JpaRepository<Medical,Integer> {
    List<Medical> findByPatient(Patient patient);
}
