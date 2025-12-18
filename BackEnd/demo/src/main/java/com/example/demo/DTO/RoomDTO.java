package com.example.demo.DTO;

import java.util.List;

public class RoomDTO {
    private int roomID;
    private String roomName;
    private String roomNum;
    private List<RoomEmployeeDTO> employees;

    public int getRoomID() {
        return roomID;
    }

    public void setRoomID(int roomID) {
        this.roomID = roomID;
    }

    public String getRoomNum() {
        return roomNum;
    }

    public void setRoomNum(String roomNum) {
        this.roomNum = roomNum;
    }

    public String getRoomName() {
        return roomName;
    }

    public void setRoomName(String roomName) {
        this.roomName = roomName;
    }

    public List<RoomEmployeeDTO> getEmployees() {
        return employees;
    }

    public void setEmployees(List<RoomEmployeeDTO> employees) {
        this.employees = employees;
    }
}
