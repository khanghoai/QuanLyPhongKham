package com.example.demo.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.Entity.Calendar;
import com.example.demo.Entity.Employee;


public interface CalendarRepository extends JpaRepository<Calendar,Integer> {

    List<Calendar> findByEmployee(Employee employee);
}
