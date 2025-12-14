package com.example.demo.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Entity.Medicine;
import com.example.demo.Repository.MedicineRepository;

@Service
public class MedicineService {
    @Autowired
    MedicineRepository medicineRepository;

    public List<Medicine> getAllMedicine(){
        return medicineRepository.findAll();
    }

    public Medicine addMedicine(Medicine medicine){
        return medicineRepository.save(medicine);
    }

    public Medicine updateMedicine(Medicine medicine){
        return medicineRepository.save(medicine);
    }

    public Medicine deleteMedicine(Medicine medicine){
        medicineRepository.delete(medicine);
        return new Medicine();
    }
}
