package com.example.demo.Service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Entity.Bill;
import com.example.demo.Entity.BillDetail;
import com.example.demo.Entity.Medical;
import com.example.demo.Entity.Medicine;
import com.example.demo.Entity.Patient;
import com.example.demo.Repository.BillDetailRepository;
import com.example.demo.Repository.BillRepostiory;
import com.example.demo.Repository.MedicalRepository;
import com.example.demo.Repository.MedicineRepository;
import com.example.demo.Repository.PatientRepository;

@Service
public class BillService {
    @Autowired
    PatientRepository patientRepository;
    @Autowired
    MedicalRepository medicalRepository;
    @Autowired
    private BillRepostiory billRepostiory;
    @Autowired
    private BillDetailRepository billDetailRepository;
    @Autowired
    private MedicineRepository medicineRepository;

    public List<BillDetail> getBillDetails(String cccd){
        cccd = cccd.replace("\"", "");
        Bill bill = getBill(cccd);
        return billDetailRepository.findByBill(bill);
    }

    private Bill getBill(String cccd){
        Patient patient = patientRepository.findByPatientCCCD(cccd).get();
        Medical medical = medicalRepository.findByPatient(patient).getLast();
        Bill bill = new Bill();
        bill.setPatient(patient);
        bill = billRepostiory.save(bill);
        List<BillDetail> billDetails = new ArrayList<>();
        String[] medicines = medical.getTreatment().split("\n");
        for(int i = 0; i < medicines.length;i++){
            String[] med = medicines[i].split(":");
            Medicine medicine = medicineRepository.findByMedicineName(med[0].trim());
            BillDetail billDetail = new BillDetail();
            billDetail.setMedicine(medicine);
            billDetail.setQuantity(Integer.parseInt(med[1].trim()));
            billDetail.setPrice(medicine.getSellingPrice()*billDetail.getQuantity());
            bill.setFullPrice(bill.getFullPrice()+billDetail.getPrice());
            billDetail.setBill(bill);
            billDetails.add(billDetail);
        }
        billDetailRepository.saveAll(billDetails);
        return billRepostiory.save(bill);
    }
}
