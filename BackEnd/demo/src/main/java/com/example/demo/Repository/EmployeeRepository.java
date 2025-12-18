package com.example.demo.Repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.Entity.Employee;
import java.util.List;


public interface EmployeeRepository extends JpaRepository<Employee,Integer> {

    List<Employee> findByEmployeeQuitFalse();

    Employee findByEmployeeCCCDAndEmployeeQuitFalse(String employeeCCCD);

    List<Employee> findByEmployeePosition(String employeePosition);

    Employee findByEmployeeCCCD(String employeeCCCD);

    List<Employee> findByEmployeePositionAndEmployeeQuit(String employeePosition, boolean employeeQuit);

}   
