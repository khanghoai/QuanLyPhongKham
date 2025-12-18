package com.example.demo.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.Entity.Patient;


@Repository
public interface PatientRepository extends JpaRepository<Patient,Integer>{

    Optional<Patient> findByPatientCCCD(String patientCCCD);
}
