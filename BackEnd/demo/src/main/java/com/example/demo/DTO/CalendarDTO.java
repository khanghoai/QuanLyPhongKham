package com.example.demo.DTO;

public class CalendarDTO {
    private int calendarID;
    private String shift;
    private String day;
    private String employeeName;
    private String roomName;
    
    public int getCalendarID() {
        return calendarID;
    }
    public void setCalendarID(int calendarID) {
        this.calendarID = calendarID;
    }
    public String getShift() {
        return shift;
    }
    public void setShift(String shift) {
        this.shift = shift;
    }
    public String getDay() {
        return day;
    }
    public void setDay(String day) {
        this.day = day;
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
