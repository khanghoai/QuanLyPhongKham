package com.example.demo.Entity;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Patient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int patientID;

    private String patientName;
    private String patientPhone;
    private String patientCCCD;
    private String patientSex;
    private LocalDate patientBirth;

    
    public int getPatientID() {
        return patientID;
    }
    public void setPatientID(int patientID) {
        this.patientID = patientID;
    }
    
    public String getPatientName() {
        return patientName;
    }
    public void setPatientName(String patientName) {
        this.patientName = patientName;
    }
    public String getPatientPhone() {
        return patientPhone;
    }
    public void setPatientPhone(String patientPhone) {
        this.patientPhone = patientPhone;
    }
    public String getPatientCCCD() {
        return patientCCCD;
    }
    public void setPatientCCCD(String patientCCCD) {
        this.patientCCCD = patientCCCD;
    }
    public String getPatientSex() {
        return patientSex;
    }
    public void setPatientSex(String patientSex) {
        this.patientSex = patientSex;
    }
    public LocalDate getPatientBirth() {
        return patientBirth;
    }
    public void setPatientBirth(LocalDate patientBirth) {
        this.patientBirth = patientBirth;
    }
    
}
