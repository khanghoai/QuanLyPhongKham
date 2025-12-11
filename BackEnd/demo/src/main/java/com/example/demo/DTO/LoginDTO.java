package com.example.demo.DTO;

public class LoginDTO {
    private String employeePosition;
    private String employeeCCCD;
    private String employeeName;
    private int employeeID;

    public int getEmployeeID() {
        return employeeID;
    }

    public void setEmployeeID(int employeeID) {
        this.employeeID = employeeID;
    }

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

    public String getEmployeePosition() {
        return employeePosition;
    }

    public void setEmployeePosition(String employeePosition) {
        this.employeePosition = employeePosition;
    }
}
