package com.example.demo.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.Entity.Account;
import com.example.demo.Entity.NhanVien;
import com.example.demo.Entity.PhongKham;
import com.example.demo.Repository.AccountRepository;
import com.example.demo.Repository.NhanVienRepository;
import com.example.demo.Repository.PhongKhamRepository;

@Service
public class AccountService {

    @Autowired
    private AccountRepository AccountRepository;
    @Autowired
    private NhanVienRepository NhanVienRepository;
    @Autowired
    private PhongKhamRepository phongKhamRepository;

    public Account taoAccount(Account tk) {
        return AccountRepository.save(tk);
    }

    public NhanVien Login(String username, String password){
        if(AccountRepository.findByUsernameAndPassword(username, password).isPresent()){
            return NhanVienRepository.findById(AccountRepository.findByUsernameAndPassword(username, password).get().getNhanVien().getMaNV()).get();
        }
        return new NhanVien() ;
    }
    
    public List<NhanVien> getAllNhanVien(){
        return NhanVienRepository.findByNghiViecFalse();
    }

    public void AddNhanVien(NhanVien nhanVien){
        nhanVien.setNghiViec(false);
        NhanVienRepository.save(nhanVien);
    }

    public void fireEmployee(NhanVien nhanVien){
        Optional<Account> account = AccountRepository.findByNhanVien(nhanVien);
        if(account.isPresent()){
            AccountRepository.delete(account.get());
        }
        nhanVien.setNghiViec(true);
        NhanVienRepository.save(nhanVien);
    }

    public boolean checkAccount(NhanVien nv){
        if(AccountRepository.findByNhanVien(nv).isPresent()){
            return true;
        }
        return false;
    }

    public NhanVien updateEmployee(NhanVien nv){
        return NhanVienRepository.save(nv);
    }

    public List<PhongKham> getAllPhongKham(){
        return phongKhamRepository.findAll();
    }

    public PhongKham addPhongKham(PhongKham phongKham){
        return phongKhamRepository.save(phongKham);
    }
}
