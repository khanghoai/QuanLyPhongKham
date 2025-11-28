package com.example.demo.Service;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.DTO.DonThuoc;
import com.example.demo.Entity.BenhAn;
import com.example.demo.Entity.BenhNhan;
import com.example.demo.Entity.ChiTietHoaDon;
import com.example.demo.Entity.HoaDon;
import com.example.demo.Entity.Thuoc;
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
        return hoaDonRepository.findByBenhNhan(benhNhanRepository.findByHoTenBN(tenBenhNhan)).get();
    }

    public HoaDon thanhToan(BenhAn benhAn){
        Optional<HoaDon> hOptional = hoaDonRepository.findByBenhNhan(benhAn.getBenhNhan());
        if(hOptional.isPresent()){
            return hOptional.get();
        }
        else{
            HoaDon hoaDon = new HoaDon();
            hoaDon.setBenhNhan(benhAn.getBenhNhan());
            hoaDon = hoaDonRepository.save(hoaDon);
            List<ChiTietHoaDon> chiTietHoaDons = new ArrayList<>();
            String[] medicines = getAllMedicine(benhAn.getTriBenh());
            for(int i = 0; i < medicines.length;i++){
                String[] med = medicines[i].split(":");
                Thuoc thuoc = thuocRepository.findByTenThuoc(med[0].trim());
                ChiTietHoaDon chiTietHoaDon = new ChiTietHoaDon();
                chiTietHoaDon.setThuoc(thuoc);
                chiTietHoaDon.setSoLuong(Integer.parseInt(med[1].trim()));
                chiTietHoaDon.setTien(thuoc.getGiaNhap()*1.2*chiTietHoaDon.getSoLuong());
                hoaDon.setTongTien(hoaDon.getTongTien()+chiTietHoaDon.getTien());
                chiTietHoaDon.setHoaDon(hoaDon);
                chiTietHoaDons.add(chiTietHoaDon);
            }
            chiTietHoaDonReposotory.saveAll(chiTietHoaDons);
            return hoaDonRepository.save(hoaDon);
        }
        
    }

    public BenhNhan xuatVien(BenhNhan benhNhan){
        benhNhan.setXuatVien(true);
        return benhNhanRepository.save(benhNhan);
    }

    private String[] getAllMedicine(String triBenh){
        return triBenh.split("\n");
    }
}
