package com.example.demo.Service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import com.example.demo.DTO.AppointmentDTO;
import com.example.demo.Entity.Appointment;
import com.example.demo.Entity.Employee;
import com.example.demo.Entity.Patient;
import com.example.demo.Repository.AppointmentRepository;
import com.example.demo.Repository.EmployeeRepository;
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
        System.out.println(appointmentDTO.getPatientCCCD());
        System.out.println(appointmentDTO.getEmployeeCCCD());
        Appointment appointment = new Appointment();
        appointment.setStatus("Đang chờ");
        appointment.setPatient(patientRepository.findByPatientCCCD(appointmentDTO.getPatientCCCD()).get());
        Employee employee = employeeRepository.findByEmployeeCCCD(appointmentDTO.getEmployeeCCCD());
        appointment.setEmployee(employee);
        appointment = appointmentRepository.save(appointment);
        messagingTemplate.convertAndSend(
            "/topic/appointment/" + employee.getEmployeeID(),
            appointmentDTO
        );
        return new Appointment();
    }
}
