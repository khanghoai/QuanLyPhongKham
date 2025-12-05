package com.example.demo.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Entity.Calendar;
import com.example.demo.Entity.Room;
import com.example.demo.Repository.CalendarRepository;
import com.example.demo.Repository.RoomRepository;

@Service
public class RoomService {
    @Autowired
    RoomRepository phongKhamRepository;

    @Autowired
    CalendarRepository calendarRepository;

    public Room addRoom(Room room){
        return phongKhamRepository.save(room);
    }

    public List<Room> getRooms(){
        return phongKhamRepository.findAll();
    }

    public Calendar addCalendar(Calendar calendar){
        return calendarRepository.save(calendar);
    }

    public List<Calendar> getCalendars(Room room){
        return calendarRepository.findByRoom(room);
    }
}
