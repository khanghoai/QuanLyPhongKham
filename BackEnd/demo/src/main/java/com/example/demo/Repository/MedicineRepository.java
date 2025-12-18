package com.example.demo.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.Entity.Medicine;


@Repository
public interface MedicineRepository extends JpaRepository<Medicine,Integer> {
    Medicine findByMedicineName(String medicineName);
}
