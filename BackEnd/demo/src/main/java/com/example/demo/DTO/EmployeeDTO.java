package com.example.demo.DTO;

import java.time.LocalDate;

public class EmployeeDTO {
    private String employeeName;
    private String employeePhone;
    private String employeeCCCD;
    private String employeeSex;
    private LocalDate employeeBirth;
    private String employeePosition;
    
    public String getEmployeeName() {
        return employeeName;
    }
    public void setEmployeeName(String employeeName) {
        this.employeeName = employeeName;
    }
    public String getEmployeePhone() {
        return employeePhone;
    }
    public void setEmployeePhone(String employeePhone) {
        this.employeePhone = employeePhone;
    }
    public String getEmployeeCCCD() {
        return employeeCCCD;
    }
    public void setEmployeeCCCD(String employeeCCCD) {
        this.employeeCCCD = employeeCCCD;
    }
    public String getEmployeeSex() {
        return employeeSex;
    }
    public void setEmployeeSex(String employeeSex) {
        this.employeeSex = employeeSex;
    }
    public LocalDate getEmployeeBirth() {
        return employeeBirth;
    }
    public void setEmployeeBirth(LocalDate employeeBirth) {
        this.employeeBirth = employeeBirth;
    }
    public String getEmployeePosition() {
        return employeePosition;
    }
    public void setEmployeePosition(String employeePosition) {
        this.employeePosition = employeePosition;
    }
}
