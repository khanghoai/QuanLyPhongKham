package com.example.demo.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Entity.BenhAn;
import com.example.demo.Entity.BenhNhan;
import com.example.demo.Service.BenhNhanService;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;



@RestController
@RequestMapping("/api/benhVien")
@CrossOrigin(origins = "http://localhost:5173/")
public class BenhVienController {
    @Autowired
    BenhNhanService benhNhanService;

    @PostMapping("/themBenhNhan")
    public void themBenhNhan(@RequestBody BenhNhan benhNhan) {
        benhNhanService.taoBenhNhan(benhNhan);
    }

    @GetMapping("/getAllBenhNhan")
    public List<BenhNhan> getAllBenhNhans() {
        return benhNhanService.getAllBenhNhans();
    }
    
    @GetMapping("/getAllBenhAn")
    public List<BenhAn> getAllBenhAn() {
        return benhNhanService.getAllBenhAns();
    }

    @PostMapping("/getBenhNhan")
    public BenhAn getBenhNhan(@RequestBody String cccd) {
        return benhNhanService.getBenhNhan(cccd);
    }

    @PostMapping("/updatePatient")
    public BenhAn updatePatient(@RequestBody BenhAn benhAn){
        return benhNhanService.updatePatient(benhAn); 
    }
}
