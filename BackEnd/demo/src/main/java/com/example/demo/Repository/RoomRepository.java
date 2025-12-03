package com.example.demo.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.Entity.Room;

public interface RoomRepository extends JpaRepository<Room,Integer> {
    
}
