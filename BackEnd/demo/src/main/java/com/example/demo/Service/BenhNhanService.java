package com.example.demo.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Entity.BenhAn;
import com.example.demo.Entity.BenhNhan;
import com.example.demo.Repository.BenhAnRepository;
import com.example.demo.Repository.BenhNhanRepository;

@Service
public class BenhNhanService {
    @Autowired
    BenhNhanRepository benhNhanRepository;
    @Autowired
    BenhAnRepository benhAnRepository;

    public void taoBenhNhan(BenhNhan benhNhan) {
        benhNhan.setXuatVien(false);
        BenhNhan result = benhNhanRepository.save(benhNhan);
        BenhAn benhAn = new BenhAn();
        benhAn.setBenhNhan(result);
        benhAnRepository.save(benhAn);
    }

    public BenhAn updatePatient(BenhAn benhAn){
        return benhAnRepository.save(benhAn);
    }

    public BenhNhan suaBenhNhan(int maBenhNhan, BenhNhan BenhNhanMoi) {
        Optional<BenhNhan> optional = benhNhanRepository.findById(maBenhNhan);
        if (optional.isPresent()) {
            BenhNhan benhNhan = optional.get();
            benhNhan.setXuatVien(BenhNhanMoi.isXuatVien());
            return benhNhanRepository.save(benhNhan); // Lưu thay đổi
        }
        return null; // Không tìm thấy tài khoản
    }

    public List<BenhNhan> getAllBenhNhans(){
        return benhNhanRepository.findAll();
    }

    public List<BenhAn> getAllBenhAns(){
        return benhAnRepository.findAll();
    }

    public BenhAn getBenhNhan(String cccd){
        Optional<BenhNhan> benhNhan = benhNhanRepository.findByCccdBN(cccd.replace("\"", ""));
        if(benhNhan.isPresent()){
            return benhAnRepository.findByBenhNhan(benhNhan.get());
        }
        else{
            return new BenhAn();
        }
    }
}
