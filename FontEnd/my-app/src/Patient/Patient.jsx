import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ADD_APPOINTMENT, ADD_PATIENT, FIND_PATIENT, GET_DOCTOR_EMPLOYEE } from "../api/api";
import { postData } from "../api/apiMethod";
import "./Patient.css";

export default function Patient() {
  const [patient, setPatient] = useState({
    patientName : "",
    patientPhone : "",
    patientCCCD : "",
    patientSex : "",
    patientBirth : ""
  })
  const [appointment, setAppointment] = useState({
    patientCCCD : "",
    employeeCCCD : "",
    status: "",
    disease : ""
  })
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const {position} = location.state || {};
  const [doctors, setDoctors] = useState([]);
  const [doctor, setDoctor] = useState({
    employeeName : "",
    roomName : "",
    employeeCCCD : ""
  });
  const [isAddPatient, setIsAddPatient] = useState(false);

  useEffect(() => {
    if(position != "Lễ tân"){
      navigate("/");
    }
  }, []);

  const findPatient = async () => {
    const CCCD = searchText;
    const res = await postData(FIND_PATIENT,CCCD);
    if(res.patientCCCD != null){
      setPatient(res);
      setAppointment({
        patientCCCD : "",
        employeeCCCD : "",
        status: "",
        disease : ""
      })
      setDoctor({
        employeeName : "",
        roomName : "",
        employeeCCCD : ""
      })
      setDoctors([])
    }
    else{
      alert("Không tìm thấy bệnh nhân, Thêm bệnh nhân")
      setIsAddPatient(true);
      setPatient({ ...patient, patientCCCD : searchText });
    }
  };

  const handleChange = (e) => {
    setPatient({ ...patient, [e.target.name]: e.target.value });
  };
  
  const ChangeAppointment = (e) => {
    setAppointment({ ...appointment, [e.target.name]: e.target.value })
  }

  const findDoctor = async () => {
    const res = await postData(GET_DOCTOR_EMPLOYEE,appointment.disease)
    setDoctors(res);
  }

  const addPatient = async () => {
    const res = await postData(ADD_PATIENT,patient)
    setIsAddPatient(false);
  }

  const addAppointment = async (doctor) => {
    const newValue = {
      ...appointment,
      patientCCCD: patient.patientCCCD,
      employeeCCCD: doctor.employeeCCCD,
      status: "Đang chờ"
    }
    setAppointment(newValue)
    setDoctor(doctor)
    await postData(ADD_APPOINTMENT,newValue);
  }

  return (
    <div className="patient-container">
      <div className="patient-header">
        <input
          className="patient-search-input"
          type="text"
          placeholder="Nhập tên cần tìm..."
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          style={{
            width: "100%",
            padding: "8px",
            marginBottom: "10px",
            borderRadius: "4px",
          }}/>
        <button className="patient-search-btn" onClick={findPatient}>
          Tìm kiếm
        </button>
      </div>
      <div className="add-patient-container">
        <div className="patient-content">
          <form className="add-patient-form">
            <div className="add-patient-form-group">
            <label className="add-patient-lable">Họ Tên</label>
            <input
              className="add-patient-input"
              type="text"
              name="patientName"
              value={patient.patientName}
              onChange={handleChange}
            />
            </div>
            <div className="add-patient-form-group">
              <label className="add-patient-lable">Số điện thoại</label>
              <input
                className="add-patient-input"
                type="text"
                name="patientPhone"
                value={patient.patientPhone}
                onChange={handleChange}
              />
            </div>
            <div className="add-patient-form-group">
              <label className="add-patient-lable">CCCD</label>
              <input
                className="add-patient-input"
                type="text"
                name="patientCCCD"
                value={patient.patientCCCD}
                onChange={handleChange}
              />
            </div>
            <div className="add-patient-form-group">
              <label className="add-patient-lable">Giới tính</label>
              <input
                className="add-patient-input"
                type="text"
                name="patientSex"
                value={patient.patientSex}
                onChange={handleChange}
              />
            </div>
            <div className="add-patient-form-group">
              <label className="add-patient-lable">Ngày sinh</label>
              <input
                className="add-patient-input"
                type="date"
                name="patientBirth"
                value={patient.patientBirth}
                onChange={handleChange}
              />
            </div>
            {isAddPatient && 
              <button type="button" className="add-patient-button" onClick={addPatient}>
                Thêm
              </button>
            }
            
          </form>
        </div>
        <div className="appointment-container">
          <h3 className="appointment-header">Lịch Hẹn</h3>
          {appointment.employeeCCCD == "" &&
          <div className="appointment-form-group">
            <label className="appointment-lable">Tình trạng</label>
            <input
              className="appointment-input"
              type="text"
              name="disease"
              value={appointment.disease}
              onChange={ChangeAppointment}
            />
            {doctors.length == 0 &&
             <button type="button" onClick={findDoctor}>Tìm bác sĩ</button>}
            {doctors.length != 0 && 
              <div className="appointment-doctors">
                {doctors.map((doctor) => (
                  <div className="appointment-doctor">
                    <p>{doctor.employeeName}</p>
                    <p>{doctor.roomName}</p>
                    <button type="button" onClick={() => addAppointment(doctor)}>Tạo lịch hẹn</button>
                  </div>
                ))}
              </div>
            }
          </div>
          }
          {appointment.employeeCCCD != "" &&
            <div className="appointment-doctor-container">
              <p>{doctor.employeeName}</p>
              <p>{doctor.roomName}</p>
              <p>{appointment.status}</p>
            </div>
          }
        </div>
      </div>
    </div>
  );
}