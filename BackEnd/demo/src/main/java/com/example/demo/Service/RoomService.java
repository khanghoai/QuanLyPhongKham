package com.example.demo.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Entity.Calendar;
import com.example.demo.Entity.Employee;
import com.example.demo.Entity.Room;
import com.example.demo.Repository.CalendarRepository;
import com.example.demo.Repository.EmployeeRepository;
import com.example.demo.Repository.RoomRepository;

@Service
public class RoomService {
    @Autowired
    RoomRepository roomRepository;

    @Autowired
    CalendarRepository calendarRepository;

    @Autowired
    EmployeeRepository employeeRepository;

    public Room addRoom(Room room){
        return roomRepository.save(room);
    }

    public List<Room> getRooms(){
        return roomRepository.findAll();
    }

    public Calendar addCalendars(List<Calendar> calendars){
        Employee employee = calendars.get(0).getEmployee();
        employeeRepository.save(employee);
        for (Calendar calendar : calendars) {
            calendarRepository.save(calendar);
        }
        return new Calendar();
    }

    public List<Calendar> getCalendars(Employee employee){
        return calendarRepository.findByEmployee(employee);
    }
}
