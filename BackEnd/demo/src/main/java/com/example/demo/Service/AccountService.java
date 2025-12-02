package com.example.demo.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Entity.Account;
import com.example.demo.Entity.Employee;
import com.example.demo.Repository.AccountRepository;
import com.example.demo.Repository.EmployeeRepository;

@Service
public class AccountService {

    @Autowired
    private AccountRepository accountRepository;
    @Autowired
    private EmployeeRepository employeeRepository;
    
    public Employee login(String username, String password){
        if(accountRepository.findByUsernameAndPassword(username, password).isPresent()){
            return employeeRepository.findById(accountRepository.findByUsernameAndPassword(username, password).get().getEmployee().getEmployeeID()).get();
        }
        return new Employee() ;
    }
    
    public List<Employee> getEmployees(){
        return employeeRepository.findByEmployeeQuitFalse();
    }

    public Employee addEmployee(Employee employee){
        employee.setEmployeeQuit(false);
        employee = employeeRepository.save(employee);
        Account account = new Account();
        account.setUsername(employee.getEmployeeCCCD());
        account.setPassword(employee.getEmployeeBirth().toString());
        account.setEmployee(employee);
        accountRepository.save(account);
        return employee;
    }

    public Employee setEmployeeQuit(Employee employee){
        Account account = accountRepository.findByEmployee(employee);
        accountRepository.delete(account);
        employee.setEmployeeQuit(true);
        return employeeRepository.save(employee);
    }

    // public Account addAccount(Account account){
    //     return accountRepository.save(account);
    // }

    // public boolean checkAccount(Employee nv){
    //     if(AccountRepository.findByNhanVien(nv).isPresent()){
    //         return true;
    //     }
    //     return false;
    // }

    public Employee updateEmployee(Employee employee){
        return employeeRepository.save(employee);
    }
}
