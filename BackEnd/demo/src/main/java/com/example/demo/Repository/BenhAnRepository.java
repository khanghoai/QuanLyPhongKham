package com.example.demo.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.Entity.BenhAn;
import com.example.demo.Entity.BenhNhan;



public interface BenhAnRepository extends JpaRepository<BenhAn,Integer> {

    BenhAn findByBenhNhan(BenhNhan benhNhan);
}
