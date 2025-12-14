package com.example.demo.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Entity.Medicine;
import com.example.demo.Service.MedicineService;



@RestController
@RequestMapping("/api/Medicine")
public class MedicienController {
    @Autowired
    MedicineService medicineService;

    @GetMapping("/getMedicines")
    public List<Medicine> getMedicines() {
        return medicineService.getAllMedicine();
    }

    @PostMapping("/addMedicine")
    public Medicine addMedicine(@RequestBody Medicine medicine) {
        return medicineService.addMedicine(medicine);
    }
    
    @PostMapping("/updateMedicine")
    public Medicine updateMedicine(@RequestBody Medicine medicine) {
        return medicineService.updateMedicine(medicine);
    }

    @PostMapping("/deleteMedicine")
    public Medicine deleteMedicine(@RequestBody Medicine medicine) {
        return medicineService.deleteMedicine(medicine);
    }

}
