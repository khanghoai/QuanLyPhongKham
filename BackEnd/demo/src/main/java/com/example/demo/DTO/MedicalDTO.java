package com.example.demo.DTO;

public class MedicalDTO {
    private String patientName;
    private String patientSex;
    private int patientAge;
    private String diagnosis;
    private String treatment;
    private int medicalID;

    public int getMedicalID() {
        return medicalID;
    }
    public void setMedicalID(int medicalID) {
        this.medicalID = medicalID;
    }
    public String getPatientName() {
        return patientName;
    }
    public void setPatientName(String patientName) {
        this.patientName = patientName;
    }
    public String getPatientSex() {
        return patientSex;
    }
    public void setPatientSex(String patientSex) {
        this.patientSex = patientSex;
    }
    public int getPatientAge() {
        return patientAge;
    }
    public void setPatientAge(int patientAge) {
        this.patientAge = patientAge;
    }
    public String getDiagnosis() {
        return diagnosis;
    }
    public void setDiagnosis(String diagnosis) {
        this.diagnosis = diagnosis;
    }
    public String getTreatment() {
        return treatment;
    }
    public void setTreatment(String treatment) {
        this.treatment = treatment;
    }
    
}
