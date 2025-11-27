package com.example.demo.Entity;
import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
public class LichHen {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int maLH;

    private LocalDate ngay;
    private LocalTime gio;

    public LocalDate getNgay() {
        return ngay;
    }
    public void setNgay(LocalDate ngay) {
        this.ngay = ngay;
    }
    public LocalTime getGio() {
        return gio;
    }
    public void setGio(LocalTime gio) {
        this.gio = gio;
    }
    // Quan hệ n-1
    @ManyToOne
    @JoinColumn(name = "MaBN")
    private BenhNhan benhNhan;

    @ManyToOne
    @JoinColumn(name = "MaNV")
    private NhanVien nhanVien;
}