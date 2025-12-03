package com.example.demo.Repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.Entity.Account;
import com.example.demo.Entity.Employee;

import java.util.Optional;

@Repository
public interface AccountRepository extends JpaRepository<Account,Integer> {
    // List<Account> findByUsername(String username);

    Optional<Account> findByUsernameAndPassword(String username, String password);

    Account findByEmployee(Employee employee);
}