package com.example.demo.Service;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.text.SimpleDateFormat;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.DTO.DoctorDTO;
import com.example.demo.DTO.EmployeeDTO;
import com.example.demo.DTO.LoginDTO;
import com.example.demo.Entity.Account;
import com.example.demo.Entity.Disease;
import com.example.demo.Entity.Employee;
import com.example.demo.Entity.Login;
import com.example.demo.Entity.Room;
import com.example.demo.Repository.AccountRepository;
import com.example.demo.Repository.CalendarRepository;
import com.example.demo.Repository.EmployeeRepository;
import com.example.demo.Repository.LoginRepository;
import com.example.demo.Repository.RoomRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;

@Service
public class AccountService {

    @Autowired
    private AccountRepository accountRepository;
    @Autowired
    private EmployeeRepository employeeRepository;
    @Autowired
    private CalendarRepository calendarRepository;
    @Autowired
    private LoginRepository loginRepository;
    @Autowired
    private RoomRepository roomRepository;
    
    public LoginDTO login(String username, String password){
        Optional<Account> account = accountRepository.findByUsernameAndPassword(username,password);
        if(account.isPresent()){
            Login login = new Login();
            Date date = new Date();
            login.setTimeLogin(new SimpleDateFormat("HH:mm").format(date));
            login.setDateLogin(new SimpleDateFormat("d/M/yyyy").format(date));
            login.setAccount(account.get());
            loginRepository.save(login);
            Employee employee = employeeRepository.findById(accountRepository.findByUsernameAndPassword(username, password).get().getEmployee().getEmployeeID()).get();
            employee.setEmployeeStatus("có mặt");
            employeeRepository.save(employee);
            LoginDTO loginDTO = new LoginDTO();
            loginDTO.setEmployeeCCCD(employee.getEmployeeCCCD());
            loginDTO.setEmployeeName(employee.getEmployeeName());
            loginDTO.setEmployeePosition(employee.getEmployeePosition());
            return loginDTO;
        }
        return new LoginDTO();
    }

    public Account logOut(EmployeeDTO employeeDTO){
        Employee employee = employeeRepository.findByEmployeeCCCD(employeeDTO.getEmployeeCCCD());
        employee.setEmployeeStatus("vắng");
        employeeRepository.save(employee);
        return new Account();
    }
    
    public List<EmployeeDTO> getEmployees(){
        List<Employee> employees = employeeRepository.findByEmployeeQuitFalse();
        List<EmployeeDTO> employeeDTOs = new ArrayList<EmployeeDTO>();
        for (Employee employee : employees) {
            EmployeeDTO employeeDTO = new EmployeeDTO();
            employeeDTO.setEmployeeName(employee.getEmployeeName());
            employeeDTO.setEmployeeBirth(employee.getEmployeeBirth());
            employeeDTO.setEmployeeCCCD(employee.getEmployeeCCCD());
            employeeDTO.setEmployeePhone(employee.getEmployeePhone());
            employeeDTO.setEmployeePosition(employee.getEmployeePosition());
            employeeDTO.setEmployeeSex(employee.getEmployeeSex());
            employeeDTOs.add(employeeDTO);
        }
        return employeeDTOs;
    }

    public Employee addEmployee(Employee employee){
        employee.setEmployeeQuit(false);
        employee = employeeRepository.save(employee);
        Account account = new Account();
        account.setUsername(employee.getEmployeeCCCD());
        account.setPassword(employee.getEmployeeBirth().format(DateTimeFormatter.ofPattern("d/M/yyyy")).toString().replace("/",""));
        account.setEmployee(employee);
        accountRepository.save(account);
        return employee;
    }

    public Employee setEmployeeQuit(Employee employee){
        Employee e = employeeRepository.findByEmployeeCCCDAndEmployeeQuitFalse(employee.getEmployeeCCCD());
        e.setEmployeeQuit(true);
        e.setAccount(null);
        e.setRoom(null);
        employeeRepository.save(e);
        accountRepository.deleteByEmployee(e);
        calendarRepository.deleteByEmployee(e);
        return new Employee();
    }

    public DoctorDTO getDoctorEmployee(String diseases) throws IOException, InterruptedException{
        diseases = diseases.replace("\"", "");
        List<Room> rooms = roomRepository.findAll();
        List<Map<String, Object>> result = new ArrayList<>();
        for (Room room : rooms) {
            room.setEmployees(null);
            if(!room.getDiseases().isEmpty()){
                List<String> diseasesData = new ArrayList<>();
                for (Disease d : room.getDiseases()) {
                    diseasesData.add(d.getDiseaseName());
                }
                result.add(Map.of(
                    "id", room.getRoomID(),
                    "name", room.getRoomName(),
                    "diseases", diseasesData
                ));
            }
        }

        System.out.println(diseases);
        ObjectMapper mapper = new ObjectMapper();

        ObjectNode assistantContent = mapper.createObjectNode();
        assistantContent.put("roomData", mapper.writeValueAsString(Map.of("rooms", result)));

        ArrayNode messages = mapper.createArrayNode();

        ObjectNode sys = mapper.createObjectNode();
        sys.put("role", "system");
        sys.put("content",
            "You are an assistant for a clinic. Always answer with ONLY the room name. " +
            "Do not explain. Do not add extra text. If no room matches, reply exactly: \"Không có phòng phù hợp\"."
        );
        messages.add(sys);

        ObjectNode assistant = mapper.createObjectNode();
        assistant.put("role", "assistant");
        assistant.put("content", assistantContent.get("roomData").asText());
        messages.add(assistant);

        ObjectNode user = mapper.createObjectNode();
        user.put("role", "user");
        user.put("content", diseases);
        messages.add(user);

        ObjectNode jsonBody = mapper.createObjectNode();
        jsonBody.put("model", "gpt-4o-mini");
        jsonBody.set("messages", messages);

        String body = mapper.writeValueAsString(jsonBody);

        HttpClient client = HttpClient.newHttpClient();
        
        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create("https://api.openai.com/v1/chat/completions"))
            .header("Content-Type", "application/json")
            .header("Authorization", "Bearer " + "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")
            .POST(HttpRequest.BodyPublishers.ofString(body))
            .build();

        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        ObjectNode json = (ObjectNode) mapper.readTree(response.body());
        String roomName = json
            .withArray("choices")
            .get(0)
            .get("message")
            .get("content")
            .asText();  
        System.out.println(roomName); 
        return new DoctorDTO();
    }

    public Employee updateEmployee(Employee employee){
        return employeeRepository.save(employee);
    }
}
