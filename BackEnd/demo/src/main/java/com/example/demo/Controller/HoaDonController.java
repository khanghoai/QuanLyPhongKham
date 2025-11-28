package com.example.demo.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Entity.BenhAn;
import com.example.demo.Entity.BenhNhan;
import com.example.demo.Entity.HoaDon;
import com.example.demo.Service.HoaDonService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/hoaDon")
public class HoaDonController {
    @Autowired
    HoaDonService hoaDonService;

    @PostMapping("/thanhToan")
    public HoaDon thanhToan(@RequestBody BenhAn benhAn) {
        return hoaDonService.thanhToan(benhAn);
    }
    
    @PostMapping("/xuatVien")
    public BenhNhan thanhToan(@RequestBody BenhNhan benhNhan) {
        return hoaDonService.xuatVien(benhNhan);
    }
}
