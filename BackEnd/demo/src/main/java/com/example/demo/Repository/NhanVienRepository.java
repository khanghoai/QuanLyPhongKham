package com.example.demo.Repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.Entity.NhanVien;
import java.util.List;


public interface NhanVienRepository extends JpaRepository<NhanVien,Integer> {

    List<NhanVien> findByNghiViecFalse();
}
