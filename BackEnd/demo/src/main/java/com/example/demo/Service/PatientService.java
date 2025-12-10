package com.example.demo.Service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Entity.Patient;
import com.example.demo.Repository.PatientRepository;

@Service
public class PatientService {
    @Autowired
    PatientRepository patientRepository;

    public Patient addPatient(Patient patient){
        return patientRepository.save(patient);
    }

    public Patient findPatiend(String CCCD){
        Optional<Patient> patient = patientRepository.findByPatientCCCD(CCCD.replace("\"", ""));
        if(patient.isPresent()){
            return patient.get();
        }
        return new Patient();
    }
}
