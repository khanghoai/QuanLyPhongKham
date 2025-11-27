package com.example.demo.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.DTO.DonThuoc;
import com.example.demo.Entity.ChiTietHoaDon;
import com.example.demo.Entity.HoaDon;
import com.example.demo.Repository.BenhNhanRepository;
import com.example.demo.Repository.ChiTietHoaDonReposotory;
import com.example.demo.Repository.HoaDonRepository;
import com.example.demo.Repository.ThuocRepository;

@Service
public class HoaDonService {
    @Autowired
    ChiTietHoaDonReposotory chiTietHoaDonReposotory;
    @Autowired
    HoaDonRepository hoaDonRepository;
    @Autowired
    ThuocRepository thuocRepository;
    @Autowired
    BenhNhanRepository benhNhanRepository;

    public void TaoDonThuoc(List<DonThuoc> donThuocs){
        HoaDon hoaDon = new HoaDon();
        hoaDon.setBenhNhan(benhNhanRepository.findByHoTenBN(donThuocs.get(0).getTenBenhNhan()));;
        hoaDon = hoaDonRepository.save(hoaDon);
        for (DonThuoc donThuoc : donThuocs) {
            ChiTietHoaDon chiTietHoaDon = new ChiTietHoaDon();
            chiTietHoaDon.setHoaDon(hoaDon);
            chiTietHoaDon.setThuoc(thuocRepository.findByTenThuoc(donThuoc.getTenThuoc()));
            chiTietHoaDon.setSoLuong(donThuoc.getSoLuong());
            chiTietHoaDonReposotory.save(chiTietHoaDon);
        }
    }

    public HoaDon getHoaDon(String tenBenhNhan){
        return hoaDonRepository.findByBenhNhan(benhNhanRepository.findByHoTenBN(tenBenhNhan));
    }
}
