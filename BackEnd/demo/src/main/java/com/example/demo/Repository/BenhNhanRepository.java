package com.example.demo.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.Entity.BenhNhan;
import java.util.Optional;



public interface BenhNhanRepository extends JpaRepository<BenhNhan,Integer> {
    BenhNhan findByHoTenBN(String hoTenBN);

    Optional<BenhNhan> findByCccdBN(String cccdBN);
}
