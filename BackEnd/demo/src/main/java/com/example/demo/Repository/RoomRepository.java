package com.example.demo.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.Entity.Room;


public interface RoomRepository extends JpaRepository<Room,Integer> {
    
    Optional<Room> findByRoomName(String roomName);
}
