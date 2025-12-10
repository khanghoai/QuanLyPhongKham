package com.example.demo.Entity;
import java.time.LocalDate;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;

@Entity
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int employeeID;

    private String employeeName;
    private String employeePhone;
    private String employeeCCCD;
    private String employeeSex;
    private LocalDate employeeBirth;
    private String employeePosition;
    private String employeeStatus;
    private boolean employeeQuit;

    @ManyToOne
    @JoinColumn(name = "roomID")
    private Room room;

    @OneToOne(mappedBy = "employee",cascade = CascadeType.ALL)
    private Account account;

    @OneToMany(mappedBy = "employee")
    private List<Calendar> calendars;

    public String getEmployeeStatus() {
        return employeeStatus;
    }

    public void setEmployeeStatus(String employeeStatus) {
        this.employeeStatus = employeeStatus;
    }

    public List<Calendar> getCalendars() {
        return calendars;
    }

    public void setCalendars(List<Calendar> calendars) {
        this.calendars = calendars;
    }

    public int getEmployeeID() {
        return employeeID;
    }

    public void setEmployeeID(int employeeID) {
        this.employeeID = employeeID;
    }

    public Account getAccount() {
        return account;
    }

    public void setAccount(Account account) {
        this.account = account;
    }

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

    public boolean isEmployeeQuit() {
        return employeeQuit;
    }

    public void setEmployeeQuit(boolean employeeQuit) {
        this.employeeQuit = employeeQuit;
    }

    public Room getRoom() {
        return room;
    }

    public void setRoom(Room room) {
        this.room = room;
    }

    public void fixDuplicate(){
        if(this.account != null) this.account.setEmployee(null);
        if(this.room != null) this.room.setEmployees(null);
        if(this.calendars != null){
            for (Calendar calendar : calendars) {
                calendar.setEmployee(null);
            }
        }
    }
}