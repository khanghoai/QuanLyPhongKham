package com.example.demo.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.Entity.Account;
import com.example.demo.Entity.Login;
import java.util.List;


@Repository
public interface LoginRepository extends JpaRepository<Login,Integer>{
    
    List<Login> findByAccount(Account account);
}
