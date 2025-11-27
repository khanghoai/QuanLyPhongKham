package com.example.demo.Entity;
import jakarta.persistence.*;
import java.util.Date;

@Entity
public class BenhAn {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int maBA;

    @ManyToOne
    @JoinColumn(name = "maBN")
    private BenhNhan benhNhan;

    @ManyToOne
    @JoinColumn(name = "maNV")
    private NhanVien nhanVien;

    @Lob
    private String benhAn;

    @Temporal(TemporalType.DATE)
    private Date ngayKham;

    @Lob
    private String triBenh;

    // Getter & Setter
    public int getMaBA() { return maBA; }
    public void setMaBA(int maBA) { this.maBA = maBA; }

    public BenhNhan getBenhNhan() { return benhNhan; }
    public void setBenhNhan(BenhNhan benhNhan) { this.benhNhan = benhNhan; }

    public NhanVien getNhanVien() { return nhanVien; }
    public void setNhanVien(NhanVien nhanVien) { this.nhanVien = nhanVien; }

    public String getBenhAn() { return benhAn; }
    public void setBenhAn(String benhAn) { this.benhAn = benhAn; }

    public Date getNgayKham() { return ngayKham; }
    public void setNgayKham(Date ngayKham) { this.ngayKham = ngayKham; }

    public String getTriBenh() { return triBenh; }
    public void setTriBenh(String triBenh) { this.triBenh = triBenh; }
}
