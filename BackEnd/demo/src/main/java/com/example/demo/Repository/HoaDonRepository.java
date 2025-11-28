package com.example.demo.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.Entity.BenhNhan;
import com.example.demo.Entity.HoaDon;


@Repository
public interface HoaDonRepository extends JpaRepository<HoaDon,Integer>{
    Optional<HoaDon> findByBenhNhan(BenhNhan benhNhan);
}
