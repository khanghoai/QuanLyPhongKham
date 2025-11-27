package com.example.demo.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.Entity.LichHen;

public interface LichHenRepository extends JpaRepository<LichHen,Integer> {
    
}
