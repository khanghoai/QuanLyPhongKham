package com.example.demo.Entity;
import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity
public class NhanVien {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int maNV;

    private String hoTenNV;
    private String sdtNV;
    private String cccdNV;
    private String gioiTinhNV;
    private LocalDate ngaySinhNV;
    private String chucVuNV;
    private boolean nghiViec;

    public int getMaNV() {
        return maNV;
    }

    public void setMaNV(int maNV) {
        this.maNV = maNV;
    }

    public String getHoTenNV() {
        return hoTenNV;
    }

    public void setHoTenNV(String hoTenNV) {
        this.hoTenNV = hoTenNV;
    }

    public String getSdtNV() {
        return sdtNV;
    }

    public void setSdtNV(String sdtNV) {
        this.sdtNV = sdtNV;
    }

    public String getCccdNV() {
        return cccdNV;
    }

    public void setCccdNV(String cccdNV) {
        this.cccdNV = cccdNV;
    }

    public String getGioiTinhNV() {
        return gioiTinhNV;
    }

    public void setGioiTinhNV(String gioiTinhNV) {
        this.gioiTinhNV = gioiTinhNV;
    }

    public LocalDate getNgaySinhNV() {
        return ngaySinhNV;
    }

    public void setNgaySinhNV(LocalDate ngaySinhNV) {
        this.ngaySinhNV = ngaySinhNV;
    }

    public String getChucVuNV() {
        return chucVuNV;
    }

    public void setChucVuNV(String chucVuNV) {
        this.chucVuNV = chucVuNV;
    }

    public boolean isNghiViec() {
        return nghiViec;
    }

    public void setNghiViec(boolean nghiViec) {
        this.nghiViec = nghiViec;
    }

    // Quan hệ 1-n
    @OneToMany(mappedBy = "nhanVien", cascade = CascadeType.ALL)
    private List<LichHen> lichHens;

    @OneToMany(mappedBy = "nhanVien", cascade = CascadeType.ALL)
    private List<BenhAn> benhAns;

    @OneToOne(mappedBy = "nhanVien", cascade = CascadeType.ALL)
    private Account account;
}