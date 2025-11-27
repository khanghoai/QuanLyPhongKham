package com.example.demo.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.Entity.ChiTietHoaDon;

@Repository
public interface ChiTietHoaDonReposotory extends JpaRepository<ChiTietHoaDon,Integer> {
    
}
