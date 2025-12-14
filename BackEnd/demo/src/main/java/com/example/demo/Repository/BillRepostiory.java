package com.example.demo.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.Entity.Bill;

@Repository
public interface BillRepostiory extends JpaRepository<Bill,Integer> {

    
}