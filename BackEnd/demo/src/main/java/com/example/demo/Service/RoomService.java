package com.example.demo.Service;

import java.text.SimpleDateFormat;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.DTO.AddRoomDTO;
import com.example.demo.DTO.CalendarDTO;
import com.example.demo.DTO.RoomDTO;
import com.example.demo.DTO.RoomEmployeeDTO;
import com.example.demo.Entity.Calendar;
import com.example.demo.Entity.Disease;
import com.example.demo.Entity.Employee;
import com.example.demo.Entity.Room;
import com.example.demo.Repository.CalendarRepository;
import com.example.demo.Repository.DiseaseRepository;
import com.example.demo.Repository.EmployeeRepository;
import com.example.demo.Repository.LoginRepository;
import com.example.demo.Repository.RoomRepository;

@Service
public class RoomService {
    @Autowired
    RoomRepository roomRepository;

    @Autowired
    CalendarRepository calendarRepository;

    @Autowired
    EmployeeRepository employeeRepository;

    @Autowired
    LoginRepository loginRepository;

    @Autowired
    DiseaseRepository diseaseRepository;

    public Room addRoom(AddRoomDTO addRoom){
        Optional<Room> room = roomRepository.findByRoomName(addRoom.getRoomName());
        if(room.isPresent()){
            List<Disease> diseases = room.get().getDiseases();
            String[] diseaseName = addRoom.getDisease().split(",");
            for (String d : diseaseName) {
                Disease disease = new Disease();
                disease.setDiseaseName(d.trim());
                disease.setRoom(room.get());
                disease = diseaseRepository.save(disease);
                diseases.add(disease);
            }
            room.get().setDiseases(diseases);
            roomRepository.save(room.get());
        }
        else{
            Room roomd = new Room();
            roomd.setRoomName(addRoom.getRoomName());
            roomd.setRoomNum(addRoom.getRoomNum());
            roomRepository.save(roomd);
        }
        return new Room();
    }

    public List<RoomDTO> getRooms(){
        List<Room> rooms = roomRepository.findAll();
        List<RoomDTO> roomDTOs = new ArrayList<RoomDTO>();
        for (Room room : rooms) {
            RoomDTO roomDTO = new RoomDTO();
            roomDTO.setRoomName(room.getRoomName());
            roomDTO.setRoomID(room.getRoomID());
            roomDTO.setRoomNum(room.getRoomNum());
            if(!room.getEmployees().isEmpty()){
                List<RoomEmployeeDTO> roomEmployeeDTOs = new ArrayList<RoomEmployeeDTO>();
                for (Employee employee : room.getEmployees()){
                    if(checkCalendar(employee)){
                        RoomEmployeeDTO roomEmployeeDTO = new RoomEmployeeDTO();
                        roomEmployeeDTO.setEmployeeID(employee.getEmployeeID());
                        roomEmployeeDTO.setEmployeeName(employee.getEmployeeName());
                        roomEmployeeDTO.setEmployeeStatus(employee.getEmployeeStatus());
                        roomEmployeeDTOs.add(roomEmployeeDTO);
                    }
                }
                roomDTO.setEmployees(roomEmployeeDTOs);
            }
            roomDTOs.add(roomDTO);
        }
        return roomDTOs;
    }

    // private boolean checkLogin(Account account){
    //     List<Login> logins =  account.getLogins();
    //     if(!logins.isEmpty()){
    //         Login lastLogin = logins.get(logins.size()-1);
    //         if(lastLogin.getTimeLogout() == null){
    //             return true;
    //         }
    //         return false;
    //     }
    //     return false;
    // }

    private boolean checkCalendar(Employee employee){
        Date now = new Date();
        for (Calendar calendar : employee.getCalendars()) {
            if(calendar.getDay().equals(new SimpleDateFormat("EEE").format(now).toLowerCase())){
                if(checkShift(calendar.getShift())){
                    return true;
                }
            }
        }
        return false;
    }

    private boolean checkShift(String shift){
        if(shift.contains(getShiftNow())){
            return true;
        }
        return false;
    }

    private String getShiftNow(){
        LocalTime now = LocalTime.now();
        LocalTime morningShiftStart = LocalTime.of(6, 0);
        LocalTime morningShiftEnd = LocalTime.of(11, 0);
        LocalTime noonShiftStart = LocalTime.of(14, 0);
        LocalTime noonShiftEnd = LocalTime.of(17, 0);
        LocalTime eveningShiftStart = LocalTime.of(19, 0);
        LocalTime eveningShiftEnd = LocalTime.of(22, 0);
        if(now.isAfter(morningShiftStart) && now.isBefore(morningShiftEnd)){
            return "0";
        }
        if(now.isAfter(noonShiftStart) && now.isBefore(noonShiftEnd)){
            return "1";
        }
        if(now.isAfter(eveningShiftStart) && now.isBefore(eveningShiftEnd)){
            return "2";
        }
        return "-1";
    }

    public Calendar addCalendars(List<Calendar> calendars){
        Employee employee = calendars.get(0).getEmployee();
        System.out.println(employee.getRoom().getRoomName());
        employeeRepository.save(employee);
        for (Calendar calendar : calendars) {
            calendarRepository.save(calendar);
        }
        return new Calendar();
    }

    public List<CalendarDTO> getCalendars(Employee employee){
        Employee emp = employeeRepository.findById(employee.getEmployeeID()).get();
        List<Calendar> calendars = calendarRepository.findByEmployee(emp);
        List<CalendarDTO> calendarDTOs = new ArrayList<>();
        for (Calendar calendar : calendars) {
            CalendarDTO calendarDTO = new CalendarDTO();
            calendarDTO.setShift(calendar.getShift());
            calendarDTO.setDay(calendar.getDay());
            calendarDTO.setEmployeeName(emp.getEmployeeName());
            calendarDTO.setRoomName(emp.getRoom().getRoomName());
            calendarDTOs.add(calendarDTO);
        }
        return calendarDTOs;
    }
}
