package com.example.demo.Service;

import java.time.LocalDate;
import java.time.Period;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
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

    public MedicalDTO acceptAppointment(AppointmentDTO appointmentDTO){
        Appointment appointment = appointmentRepository.findById(appointmentDTO.getAppointmentID()).get();
        appointment.setStatus("Đã nhận");
        appointment = appointmentRepository.save(appointment);
        Medical medical = new Medical();
        Patient patient = patientRepository.findByPatientCCCD(appointmentDTO.getPatientCCCD()).get();
        medical.setEmployee(employeeRepository.findByEmployeeCCCD(appointmentDTO.getEmployeeCCCD()));
        medical.setPatient(patient);
        medical.setDiagnosis(appointmentDTO.getDisease());
        medical.setTreatment("");
        medical = medicalRepository.save(medical);
        MedicalDTO medicalDTO = new MedicalDTO();
        medicalDTO.setMedicalID(medical.getMedicalID());
        medicalDTO.setPatientName(patient.getPatientName());
        medicalDTO.setPatientSex(patient.getPatientSex());
        medicalDTO.setPatientAge(calculateAge(patient.getPatientBirth()));
        medicalDTO.setDiagnosis(medical.getDiagnosis());
        medicalDTO.setTreatment(medical.getTreatment());
        return medicalDTO;
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
