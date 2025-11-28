package com.example.demo.Entity;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;

@Entity
public class ChiTietHoaDon {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int maCTHD;
    private int soLuong;
    private double tien;

    @ManyToOne
    @JoinColumn(name = "MaHD")
    @JsonIgnore
    private HoaDon hoaDon;

    @ManyToOne
    @JoinColumn(name = "maThuoc")
    private Thuoc thuoc;

    public int getSoLuong() {
        return soLuong;
    }
    public void setSoLuong(int soLuong) {
        this.soLuong = soLuong;
    }
    public double getTien() {
        return tien;
    }
    public void setTien(double tien) {
        this.tien = tien;
    }

    public HoaDon getHoaDon(){
        return hoaDon;
    }

    public void setHoaDon(HoaDon hoaDon){
        this.hoaDon = hoaDon;
    }
    
    public Thuoc getThuoc() {
        return thuoc;
    }
    
    public void setThuoc(Thuoc thuoc) {
        this.thuoc = thuoc;
    }
}