package com.example.demo.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Calendar {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int calendarID;
    
    private String shift;

    @ManyToOne
    @JoinColumn(name = "employeeID")
    private Employee employee;

    @ManyToOne
    @JoinColumn(name = "roomID")
    private Room room;

    public int getCalendarID() {
        return calendarID;
    }

    public void setCalendarID(int calendarID) {
        this.calendarID = calendarID;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public Room getRoom() {
        return room;
    }

    public void setRoom(Room room) {
        this.room = room;
    }

    public String getShift() {
        return shift;
    }

    public void setShift(String shift) {
        this.shift = shift;
    }


}
