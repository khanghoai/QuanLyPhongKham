package com.example.demo.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Entity.Thuoc;
import com.example.demo.Repository.ThuocRepository;

@Service
public class MedicineService {
    @Autowired
    ThuocRepository medicineRepository;

    public List<Thuoc> getAllMedicine(){
        return medicineRepository.findAll();
    }

    public Thuoc addMedicine(Thuoc medicine){
        return medicineRepository.save(medicine);
    }
}
