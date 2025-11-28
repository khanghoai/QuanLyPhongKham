package com.example.demo.Entity;
import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity
public class HoaDon {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int maHD;
    private double phiKham;
    private double tongTien;
    private LocalDate ngayThanhToan;
    
    @ManyToOne
    @JoinColumn(name = "MaBN")
    private BenhNhan benhNhan;
    
    @OneToMany(mappedBy = "hoaDon", cascade = CascadeType.ALL)
    private List<ChiTietHoaDon> chiTietHoaDons;

    public double getPhiKham() {
        return phiKham;
    }
    public void setPhiKham(double phiKham) {
        this.phiKham = phiKham;
    }
    public double getTongTien() {
        return tongTien;
    }
    public void setTongTien(double tongTien) {
        this.tongTien = tongTien;
    }
    public LocalDate getNgayThanhToan() {
        return ngayThanhToan;
    }
    public void setNgayThanhToan(LocalDate ngayThanhToan) {
        this.ngayThanhToan = ngayThanhToan;
    }

    public BenhNhan getBenhNhan() {
        return benhNhan;
    }
    
    public void setBenhNhan(BenhNhan benhNhan) {
        this.benhNhan = benhNhan;
    }

    public List<ChiTietHoaDon> getChiTietHoaDons() {
        return chiTietHoaDons;
    }
    public void setChiTietHoaDons(List<ChiTietHoaDon> chiTietHoaDons) {
        this.chiTietHoaDons = chiTietHoaDons;
    }
}
