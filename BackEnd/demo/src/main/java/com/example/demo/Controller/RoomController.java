package com.example.demo.Controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Entity.Calendar;
import com.example.demo.Entity.Employee;
import com.example.demo.Entity.Room;
import com.example.demo.Service.RoomService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;



@RestController
@RequestMapping("/api/Room")
public class RoomController {
    
    @Autowired
    RoomService roomService;

    @PostMapping("/addRoom")
    public Room addRoom(@RequestBody Room room) {
        return roomService.addRoom(room);
    }

    @GetMapping("/getRooms")
    public List<Room> getRooms() {
        return roomService.getRooms();
    }

    @PostMapping("/addCalendars")
    public Calendar addCalendars(@RequestBody List<Calendar> calendar) {
        return roomService.addCalendars(calendar);
    }

    @PostMapping("/getCalendarByEmployee")
    public List<Calendar> getCalendarByEmployee(@RequestBody Employee employee) {
        return roomService.getCalendars(employee);
    }
    
}
