package com.example.demo.Entity;
import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

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
    private boolean employeeQuit;

    @ManyToOne
    @JoinColumn(name = "RoomID")
    @JsonIgnore
    private Room room;

    @OneToOne(mappedBy = "employee",cascade = CascadeType.ALL,orphanRemoval = true)
    @JsonIgnore
    private Account account;

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

    @OneToMany(mappedBy = "nhanVien", cascade = CascadeType.ALL)
    private List<LichHen> lichHens;

    @OneToMany(mappedBy = "nhanVien", cascade = CascadeType.ALL)
    private List<BenhAn> benhAns;
}