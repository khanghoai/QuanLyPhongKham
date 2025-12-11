package com.example.demo.Controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.DTO.DoctorDTO;
import com.example.demo.DTO.EmployeeDTO;
import com.example.demo.DTO.LoginDTO;
import com.example.demo.Entity.Account;
import com.example.demo.Entity.Employee;
import com.example.demo.Service.AccountService;

@RestController
@RequestMapping("/api/Account")
public class AccountController {

    @Autowired
    private AccountService accountService;

    @PostMapping("/login")
    public LoginDTO login(@RequestBody Account account) {
        return accountService.login(account.getUsername(), account.getPassword());
    }

    @PostMapping("/logout")
    public Account logout(@RequestBody String cccd) {
        return accountService.logout(cccd);
    }
    

    @GetMapping("/getEmployees")
    public List<EmployeeDTO> getEmployees() {
        return accountService.getEmployees();
    }

    @PostMapping("/addEmployee")
    public Employee addEmployee(@RequestBody Employee employee) {
        return accountService.addEmployee(employee);
    }

    @PostMapping("/setEmployeeQuit")
    public Employee setEmployeeQuit(@RequestBody Employee employee) {
        return accountService.setEmployeeQuit(employee);
    }
    
    @PostMapping("/updateEmployee")
    public Employee updateEmployee(@RequestBody Employee employee) {
        return accountService.updateEmployee(employee);
    }

    @PostMapping("/getDoctorEmployee")
    public DoctorDTO getDoctorEmployee(@RequestBody String disease) throws IOException, InterruptedException {
        return accountService.getDoctorEmployee(disease);
    }

}
