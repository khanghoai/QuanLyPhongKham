package com.example.demo.Entity;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Bill {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int billID;

    private double fullPrice;
    private LocalDate paymentDate;

    @ManyToOne
    @JoinColumn(name = "patientID")
    private Patient patient;
    
    public double getFullPrice() {
        return fullPrice;
    }
    public void setFullPrice(double fullPrice) {
        this.fullPrice = fullPrice;
    }
    public Patient getPatient() {
        return patient;
    }
    public void setPatient(Patient patient) {
        this.patient = patient;
    }
    public int getBillID() {
        return billID;
    }
    public void setBillID(int billID) {
        this.billID = billID;
    }
    public LocalDate getPaymentDate() {
        return paymentDate;
    }
    public void setPaymentDate(LocalDate paymentDate) {
        this.paymentDate = paymentDate;
    }
}
