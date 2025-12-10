package com.example.demo.Entity;
import jakarta.persistence.*;
import java.util.Date;

@Entity
public class BenhAn {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int maBA;

    @ManyToOne
    @JoinColumn(name = "patientID")
    private Patient patient;

    @Lob
    private String benh;

    @Temporal(TemporalType.DATE)
    private Date ngayKham;

    @Lob
    private String triBenh;

    public int getMaBA() {
        return maBA;
    }

    public void setMaBA(int maBA) {
        this.maBA = maBA;
    }

    public Patient getPatient() {
        return patient;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
    }

    public String getBenh() {
        return benh;
    }

    public void setBenh(String benh) {
        this.benh = benh;
    }

    public Date getNgayKham() {
        return ngayKham;
    }

    public void setNgayKham(Date ngayKham) {
        this.ngayKham = ngayKham;
    }

    public String getTriBenh() {
        return triBenh;
    }

    public void setTriBenh(String triBenh) {
        this.triBenh = triBenh;
    }


}
