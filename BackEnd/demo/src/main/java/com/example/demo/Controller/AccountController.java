package com.example.demo.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.DTO.AccountDTO;
import com.example.demo.Entity.Account;
import com.example.demo.Entity.NhanVien;
import com.example.demo.Entity.PhongKham;
import com.example.demo.Service.AccountService;



@RestController
@RequestMapping("/api/Account")
@CrossOrigin(origins = "http://localhost:5173/")
public class AccountController {

    @Autowired
    private AccountService accountService;

    @PostMapping("/createAccount")
    public Account createAccount(@RequestBody Account tk) {
        return accountService.taoAccount(tk);
    }

    @PostMapping("/login")
    public NhanVien login(@RequestBody AccountDTO tk) {
        return accountService.Login(tk.getUsername(), tk.getPassword());
    }

    @GetMapping("/getAllNhanVien")
    public List<NhanVien> getAllNhanViens() {
        return accountService.getAllNhanVien();
    }

    @PostMapping("/AddNhanVien")
    public void AddNhanVien(@RequestBody NhanVien nhanVien) {
        accountService.AddNhanVien(nhanVien);
    }

    @PostMapping("/fireEmployee")
    public NhanVien fireEmployee(@RequestBody NhanVien nv) {
        accountService.fireEmployee(nv);
        return new NhanVien();
    }
    
    @PostMapping("/checkAccount")
    public Boolean checkAccount(@RequestBody NhanVien nhanVien) {
        return accountService.checkAccount(nhanVien);
    }
    
    @PostMapping("/updateEmployee")
    public NhanVien updateEmployee(@RequestBody NhanVien nv) {
        return accountService.updateEmployee(nv);
    }

    @GetMapping("/getAllPhongKham")
    public List<PhongKham> getAllPhongKham() {
        return accountService.getAllPhongKham();
    }

    @PostMapping("/themPhongKham")
    public PhongKham themPhongKham(@RequestBody PhongKham phongKham) {
        return accountService.addPhongKham(phongKham);
    }
    
    
}
