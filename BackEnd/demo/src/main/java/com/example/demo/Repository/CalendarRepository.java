package com.example.demo.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;

import com.example.demo.Entity.Calendar;
import com.example.demo.Entity.Employee;

import jakarta.transaction.Transactional;


public interface CalendarRepository extends JpaRepository<Calendar,Integer> {

    List<Calendar> findByEmployee(Employee employee);

    @Transactional
    @Modifying
    void deleteByEmployee(Employee employee);
}
