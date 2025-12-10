import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ADD_PATIENT, FIND_PATIENT, GET_DOCTOR_EMPLOYEE } from "../api/api";
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
    disease : "",
    employee : ""
  })
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const {position} = location.state || {};

  useEffect(() => {
    if(position != "leTan"){
      navigate("/");
    }
  }, []);

  const findPatient = async () => {
    const CCCD = searchText;
    const res = await postData(FIND_PATIENT,CCCD);
    if(res.patientCCCD != null){
      setPatient(res);
    }
    else{
      alert("Không tìm thấy bệnh nhân")
    }
  };

  const handleChange = (e) => {
    setPatient({ ...patient, [e.target.name]: e.target.value });
  };
  
  const ChangeAppointment = (e) => {
    setAppointment({ ...appointment, [e.target.name]: e.target.value })
  }

  const findDoctor = async () => {
    await postData(GET_DOCTOR_EMPLOYEE,appointment.disease)
  }

  const addPatient = async () => {
    const res = await postData(ADD_PATIENT,patient)
    console.log(res);
  }

  return (
    <div className="employee-container">
      <div className="employee-header">
        <h2 className="employee-title">Bệnh nhân</h2>
        <input
          className="emp-search-input"
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
        <button className="emp-search-btn" onClick={findPatient}>
          Tìm kiếm
        </button>
      </div>
      <div className="add-patient-container">
        <form className="add-patient-form">
          <h3 className="add-patient-title">Thêm bệnh nhân</h3>
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
            <button type="button" className="add-patient-button" onClick={addPatient}>
              Thêm
            </button>
          </form>
        <div>
          <h3>Lịch Hẹn</h3>
          <form action="">
            <div className="add-patient-form-group">
              <label className="add-patient-lable">Tình trạng</label>
              <input
                className="add-patient-input"
                type="text"
                name="disease"
                value={appointment.disease}
                onChange={ChangeAppointment}
              />
              <button type="button" onClick={findDoctor}>Tìm bác sĩ</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}