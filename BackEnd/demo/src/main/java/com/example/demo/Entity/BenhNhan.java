package com.example.demo.Entity;
import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class BenhNhan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int maBN;

    private String hoTenBN;
    private String sdtBN;
    private String cccdBN;
    private String gioiTinhBN;
    private LocalDate ngaySinhBN;
    private boolean xuatVien;

    public int getMaBN() {
        return maBN;
    }

    public void setMaBN(int maBN) {
        this.maBN = maBN;
    }

    public String getHoTenBN() {
        return hoTenBN;
    }

    public void setHoTenBN(String hoTenBN) {
        this.hoTenBN = hoTenBN;
    }

    public String getSdtBN() {
        return sdtBN;
    }

    public void setSdtBN(String sdtBN) {
        this.sdtBN = sdtBN;
    }

    public String getCccdBN() {
        return cccdBN;
    }

    public void setCccdBN(String cccdBN) {
        this.cccdBN = cccdBN;
    }

    public String getGioiTinhBN() {
        return gioiTinhBN;
    }

    public void setGioiTinhBN(String gioiTinhBN) {
        this.gioiTinhBN = gioiTinhBN;
    }

    public LocalDate getNgaySinhBN() {
        return ngaySinhBN;
    }

    public void setNgaySinhBN(LocalDate ngaySinhBN) {
        this.ngaySinhBN = ngaySinhBN;
    }

    public boolean isXuatVien() {
        return xuatVien;
    }

    public void setXuatVien(boolean xuatVien) {
        this.xuatVien = xuatVien;
    }
}