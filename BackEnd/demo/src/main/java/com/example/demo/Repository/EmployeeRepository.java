package com.example.demo.Repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.Entity.Employee;
import java.util.List;


public interface EmployeeRepository extends JpaRepository<Employee,Integer> {

    List<Employee> findByEmployeeQuitFalse();
}   
