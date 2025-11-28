package com.example.demo.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Entity.Thuoc;
import com.example.demo.Service.MedicineService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;



@RestController
@RequestMapping("/api/Medicine")
public class MedicienController {
    @Autowired
    MedicineService medicineService;

    @GetMapping("/getAllMedicine")
    public List<Thuoc> getAllMedicine() {
        return medicineService.getAllMedicine();
    }

    @PostMapping("/addMedicine")
    public Thuoc addMedicine(@RequestBody Thuoc medicine) {
        return medicineService.addMedicine(medicine);
    }
    
    @PostMapping("/updateMedicine")
    public Thuoc updateMedicine(@RequestBody Thuoc medicine) {
        return medicineService.updateMedicine(medicine);
    }

    @PostMapping("/deleteMedicine")
    public Thuoc deleteMedicine(@RequestBody Thuoc medicine) {
        return medicineService.deleteMedicine(medicine);
    }

}
