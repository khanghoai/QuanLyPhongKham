package com.example.demo.Service;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.LocalDate;
import java.time.Period;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import com.example.demo.DTO.AppointmentDTO;
import com.example.demo.DTO.MedicalDTO;
import com.example.demo.Entity.Appointment;
import com.example.demo.Entity.Employee;
import com.example.demo.Entity.Medical;
import com.example.demo.Entity.Patient;
import com.example.demo.Repository.AppointmentRepository;
import com.example.demo.Repository.EmployeeRepository;
import com.example.demo.Repository.MedicalRepository;
import com.example.demo.Repository.PatientRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;

@Service
public class PatientService {
    @Autowired
    PatientRepository patientRepository;
    @Autowired
    AppointmentRepository appointmentRepository;
    @Autowired
    EmployeeRepository employeeRepository;
    @Autowired
    private MedicalRepository medicalRepository;
    @Autowired
    private SimpMessagingTemplate messagingTemplate;
    @Value("${openai.api.key}")
    private String openAIKey;

    public Patient addPatient(Patient patient){
        return patientRepository.save(patient);
    }

    public Patient findPatiend(String CCCD){
        Optional<Patient> patient = patientRepository.findByPatientCCCD(CCCD.replace("\"", ""));
        if(patient.isPresent()){
            return patient.get();
        }
        return new Patient();
    }

    public Appointment addAppointment(AppointmentDTO appointmentDTO){
        Appointment appointment = new Appointment();
        appointment.setStatus("Đang chờ");
        appointment.setPatient(patientRepository.findByPatientCCCD(appointmentDTO.getPatientCCCD()).get());
        Employee employee = employeeRepository.findByEmployeeCCCD(appointmentDTO.getEmployeeCCCD());
        appointment.setEmployee(employee);
        appointment = appointmentRepository.save(appointment);
        appointmentDTO.setAppointmentID(appointment.getAppointmentID());
        messagingTemplate.convertAndSend(
            "/topic/appointment/" + employee.getEmployeeID(),
            appointmentDTO
        );
        return new Appointment();
    }

    public MedicalDTO acceptAppointment(AppointmentDTO appointmentDTO) throws IOException, InterruptedException{
        Appointment appointment = appointmentRepository.findById(appointmentDTO.getAppointmentID()).get();
        appointment.setStatus("Đã nhận");
        appointment = appointmentRepository.save(appointment);
        Medical medical = new Medical();
        Patient patient = patientRepository.findByPatientCCCD(appointmentDTO.getPatientCCCD()).get();
        medical.setEmployee(employeeRepository.findByEmployeeCCCD(appointmentDTO.getEmployeeCCCD()));
        medical.setPatient(patient);
        medical.setDiagnosis("");
        medical.setTreatment("");
        medical = medicalRepository.save(medical);
        MedicalDTO medicalDTO = new MedicalDTO();
        JsonNode root = getMedicalSuggestion(appointmentDTO.getDisease());
        medicalDTO.setPossibleDiseases(root.get("possibleDiseases"));
        medicalDTO.setSuggestMedicine(root.get("proposedMedicines"));
        medicalDTO.setMedicalID(medical.getMedicalID());
        medicalDTO.setPatientName(patient.getPatientName());
        medicalDTO.setPatientSex(patient.getPatientSex());
        medicalDTO.setPatientAge(calculateAge(patient.getPatientBirth()));
        medicalDTO.setDisease(appointmentDTO.getDisease());
        medicalDTO.setDiagnosis(medical.getDiagnosis());
        medicalDTO.setTreatment(medical.getTreatment());
        return medicalDTO;
    }

    public JsonNode getMedicalSuggestion(String disease) throws IOException, InterruptedException {

        ObjectMapper mapper = new ObjectMapper();

        ObjectNode system = mapper.createObjectNode();
        system.put("role", "system");
        system.put(
            "content",
            "Bạn là trợ lý y tế cho một phòng khám. " +
            "CHỈ đưa ra các gợi ý y khoa mang tính tham khảo. " +
            "KHÔNG đưa ra chẩn đoán cuối cùng. " +
            "KHÔNG kê đơn thuốc bắt buộc. " +
            "Chỉ được ĐỀ XUẤT TÊN THUỐC PHỔ BIẾN, không nêu liều lượng. " +
            "Luôn trả lời CHỈ DƯỚI DẠNG JSON, không kèm giải thích."
        );

        ObjectNode assistant = mapper.createObjectNode();
        assistant.put("role", "assistant");
        assistant.put(
            "content",
            """
            Hãy trả kết quả đúng theo định dạng JSON sau:
            {
            "possibleDiseases": [],
            "proposedMedicines": []
            }
            """
        );

        ObjectNode user = mapper.createObjectNode();
        user.put("role", "user");
        user.put(
            "content",
            """
            Thông tin bệnh nhân:
            Triệu chứng: %s
            """
            .formatted(disease)
        );

        ArrayNode messages = mapper.createArrayNode();
        messages.add(system);
        messages.add(assistant);
        messages.add(user);

        ObjectNode jsonBody = mapper.createObjectNode();
        jsonBody.put("model", "gpt-4o-mini");
        jsonBody.set("messages", messages);
        jsonBody.put("temperature", 0.3);

        String body = mapper.writeValueAsString(jsonBody);

        HttpClient client = HttpClient.newHttpClient();

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://api.openai.com/v1/chat/completions"))
                .header("Content-Type", "application/json")
                .header("Authorization", "Bearer " + openAIKey)
                .POST(HttpRequest.BodyPublishers.ofString(body))
                .build();

        HttpResponse<String> response =
                client.send(request, HttpResponse.BodyHandlers.ofString());

        ObjectNode json = (ObjectNode) mapper.readTree(response.body());

        String content =
                json.get("choices")
                    .get(0)
                    .get("message")
                    .get("content")
                    .asText();
        return mapper.readTree(content);
    }

    public MedicalDTO updateMedical(MedicalDTO medicalDTO){
        Medical medical = medicalRepository.findById(medicalDTO.getMedicalID()).get();
        medical.setDiagnosis(medicalDTO.getDiagnosis());
        medical.setTreatment(medicalDTO.getTreatment());
        medicalRepository.save(medical);
        return medicalDTO;
    }

    private int calculateAge(LocalDate birth) {
        LocalDate today = LocalDate.now();
        return Period.between(birth, today).getYears();
    }
}
