package com.example.demo.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.Entity.Thuoc;


@Repository
public interface ThuocRepository extends JpaRepository<Thuoc,Integer> {
    Thuoc findByTenThuoc(String tenThuoc);
}
