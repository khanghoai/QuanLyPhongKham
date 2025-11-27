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
import com.example.demo.Service.AccountService;


@RestController
@RequestMapping("/api/Account")
@CrossOrigin(origins = "http://localhost:5173/")
public class AccountController {

    @Autowired
    private AccountService AccountService;

    @PostMapping("/createAccount")
    public Account createAccount(@RequestBody Account tk) {
        return AccountService.taoAccount(tk);
    }

    @PostMapping("/login")
    public NhanVien login(@RequestBody AccountDTO tk) {
        return AccountService.Login(tk.getUsername(), tk.getPassword());
    }

    @GetMapping("/getAllNhanVien")
    public List<NhanVien> getAllNhanViens() {
        return AccountService.getAllNhanVien();
    }

    @PostMapping("/AddNhanVien")
    public void AddNhanVien(@RequestBody NhanVien nhanVien) {
        AccountService.AddNhanVien(nhanVien);
    }

    @PostMapping("/fireEmployee")
    public NhanVien fireEmployee(@RequestBody NhanVien nv) {
        AccountService.fireEmployee(nv);
        return new NhanVien();
    }
    
    @PostMapping("/checkAccount")
    public Boolean checkAccount(@RequestBody NhanVien nhanVien) {
        return AccountService.checkAccount(nhanVien);
    }
    
    @PostMapping("/updateEmployee")
    public NhanVien updateEmployee(@RequestBody NhanVien nv) {
        return AccountService.updateEmployee(nv);
    }
    
    

    // @GetMapping("/test")
    // public Account getMethodName() {
    //     return AccountService.timAccount("admin");
    // }
    
    

    // @DeleteMapping("/{id}")
    // public void xoaAccount(@PathVariable int id) {
    //     AccountService.xoaAccount(id);
    // }

    // @PutMapping("/{id}")
    // public ResponseEntity<?> suaAccount(@PathVariable int id, @RequestBody Account AccountMoi) {
    //     Account tk = AccountService.suaAccount(id, AccountMoi);
    //     if (tk != null) {
    //         return ResponseEntity.ok(tk);
    //     } else {
    //         return ResponseEntity.status(404).body("Không tìm thấy tài khoản!");
    //     }
    // }
}
