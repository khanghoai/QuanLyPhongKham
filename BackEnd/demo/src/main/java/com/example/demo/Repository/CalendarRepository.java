package com.example.demo.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.Entity.Calendar;
import com.example.demo.Entity.Room;

import java.util.List;


public interface CalendarRepository extends JpaRepository<Calendar,Integer> {

    List<Calendar> findByRoom(Room room);
}
