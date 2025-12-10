package com.example.demo.DTO;

public class AddRoomDTO {
    private String roomName;
    private String roomNum;
    private String disease;
    
    public String getRoomName() {
        return roomName;
    }
    public void setRoomName(String roomName) {
        this.roomName = roomName;
    }
    public String getRoomNum() {
        return roomNum;
    }
    public void setRoomNum(String roomNum) {
        this.roomNum = roomNum;
    }
    public String getDisease() {
        return disease;
    }
    public void setDisease(String disease) {
        this.disease = disease;
    }
}
