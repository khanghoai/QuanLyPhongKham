package com.example.demo.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Entity.Room;
import com.example.demo.Repository.RoomRepository;

@Service
public class RoomService {
    @Autowired
    RoomRepository phongKhamRepository;

    public Room addRoom(Room room){
        return phongKhamRepository.save(room);
    }

    public List<Room> getRooms(){
        return phongKhamRepository.findAll();
    }
}
