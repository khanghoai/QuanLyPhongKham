package com.example.demo.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Entity.BillDetail;
import com.example.demo.Service.BillService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/Bill")
public class BillController {
    @Autowired
    private BillService billService;

    @PostMapping("/getBillDetails")
    public List<BillDetail> getBillDetails(@RequestBody String cccd) {
        return billService.getBillDetails(cccd);
    }
}
