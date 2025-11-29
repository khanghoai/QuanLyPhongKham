package com.example.demo.Entity;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class PhongKham {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int maPhongBan;
    private int tenPhongBan;

    @OneToMany(mappedBy = "phongKham", cascade = CascadeType.ALL)
    private List<NhanVien> nhanViens;

    public int getMaPhongBan() {
        return maPhongBan;
    }

    public void setMaPhongBan(int maPhongBan) {
        this.maPhongBan = maPhongBan;
    }

    public int getTenPhongBan() {
        return tenPhongBan;
    }

    public void setTenPhongBan(int tenPhongBan) {
        this.tenPhongBan = tenPhongBan;
    }

    
    public List<NhanVien> getNhanViens() {
        return nhanViens;
    }

    public void setNhanViens(List<NhanVien> nhanViens) {
        this.nhanViens = nhanViens;
    }
}