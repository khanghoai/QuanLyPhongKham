package com.example.demo.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Entity.LichHen;
import com.example.demo.Repository.LichHenRepository;

@Service
public class LichHenService {
    @Autowired
    LichHenRepository lichHenRepository;
    
    public LichHen taoTaiKhoan(LichHen lh) {
        return lichHenRepository.save(lh);
    }

}
