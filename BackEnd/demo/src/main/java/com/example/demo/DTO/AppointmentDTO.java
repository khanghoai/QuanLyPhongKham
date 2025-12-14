package com.example.demo.DTO;

public class AppointmentDTO {
    private String patientCCCD;
    private String employeeCCCD;
    private String status;
    private String disease;
    private int appointmentID;

    public int getAppointmentID() {
        return appointmentID;
    }
    public void setAppointmentID(int appointmentID) {
        this.appointmentID = appointmentID;
    }
    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }
    public String getDisease() {
        return disease;
    }
    public void setDisease(String disease) {
        this.disease = disease;
    }
    public String getEmployeeCCCD() {
        return employeeCCCD;
    }
    public void setEmployeeCCCD(String employeeCCCD) {
        this.employeeCCCD = employeeCCCD;
    }
    public String getPatientCCCD() {
        return patientCCCD;
    }
    public void setPatientCCCD(String patientCCCD) {
        this.patientCCCD = patientCCCD;
    }
}
