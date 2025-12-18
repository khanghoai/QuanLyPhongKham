package com.example.demo.DTO;

public class DoctorDTO {
    private String employeeName;
    private String roomName;
    private String employeeCCCD;
    
    public String getEmployeeCCCD() {
        return employeeCCCD;
    }
    public void setEmployeeCCCD(String employeeCCCD) {
        this.employeeCCCD = employeeCCCD;
    }
    public String getEmployeeName() {
        return employeeName;
    }
    public void setEmployeeName(String employeeName) {
        this.employeeName = employeeName;
    }
    public String getRoomName() {
        return roomName;
    }
    public void setRoomName(String roomName) {
        this.roomName = roomName;
    }
}
