package com.example.demo.Entity;
import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "Thuoc")
public class Thuoc {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int maThuoc;

    private String tenThuoc;
    private String noiNhap;
    private int soLuong;
    private double giaNhap;
    private double giaBan;

    public double getGiaBan() {
        return giaBan;
    }
    public void setGiaBan(double giaBan) {
        this.giaBan = giaBan;
    }
    public String getTenThuoc() {
        return tenThuoc;
    }
    public void setTenThuoc(String tenThuoc) {
        this.tenThuoc = tenThuoc;
    }
    public String getNoiNhap() {
        return noiNhap;
    }
    public void setNoiNhap(String noiNhap) {
        this.noiNhap = noiNhap;
    }
    public int getSoLuong() {
        return soLuong;
    }
    public void setSoLuong(int soLuong) {
        this.soLuong = soLuong;
    }
    public double getGiaNhap() {
        return giaNhap;
    }
    public void setGiaNhap(double giaNhap) {
        this.giaNhap = giaNhap;
    }

    // Getter Setter
    public int getMaThuoc() { return maThuoc; }
    public void setMaThuoc(int maThuoc) { this.maThuoc = maThuoc; }
}

