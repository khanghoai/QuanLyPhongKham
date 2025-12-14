import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import SockJS from "sockjs-client";
import * as Stomp from "stompjs";
import "./Doctor.css";
import { postData } from "../api/apiMethod";
import { ACCEPT_APPOINTMENT, UPDATE_MEDICAL } from "../api/api";

export default function Doctor() {
  const [haveAppointment,setHaveAppointment] = useState(false);
  const [appointment,setAppointment] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [isSubmitform,setIsSubmitForm] = useState(false);
  const {position} = location.state || {};
  const {doctorID} = useParams();
  const [medical, setMedical] = useState({
    patientName : "",
    patientSex : "",
    patientAge : "",
    diagnosis : "",
    treatment : ""
  })

  useEffect(() => {
    if(position != "Bác sĩ"){
      navigate("/");
    }
  }, []);

  useEffect(() => {
    const socket = new SockJS("http://localhost:8080/ws");
    const stompClient = Stomp.over(socket);
    stompClient.connect({}, () => {
      stompClient.subscribe(`/topic/appointment/${doctorID}`, (message) => {
        const appointment = JSON.parse(message.body);
        setAppointment(appointment);
        setHaveAppointment(true);
      });
      
    });
    
    return () => {
      stompClient.disconnect();
    };
  }, [doctorID])

  const handleChange = (e) => { 
    setMedical({...medical, [e.target.name] : e.target.value})
  }

  const acceptAppointment = async () => {
    const res = await postData(ACCEPT_APPOINTMENT,appointment);
    setMedical(res);
    setHaveAppointment(false);
  }

  const updateMedical = async () => {
    await postData(UPDATE_MEDICAL,medical)
    setIsSubmitForm(true);
  }

  const exit = () => {
    setMedical({
      patientName : "",
      patientSex : "",
      patientAge : "",
      diagnosis : "",
      treatment : ""
    })
    setIsSubmitForm(false);
  }

  return (
    <div className="medical-container">
      <form className="medical-form">
        <div className="medical-form-group">
          <label className="medical-lable">Họ Tên</label>
          <input
            className="medical-input"
            type="text"
            name="patientName"
            value={medical.patientName}
            onChange={handleChange}
            disabled
          />
        </div>
        <div className="medical-form-group">
          <label className="medical-lable">Giới tính</label>
          <input
            className="medical-input"
            type="text"
            name="patientSex"
            value={medical.patientSex}
            onChange={handleChange}
            disabled
          />
        </div>
        <div className="medical-form-group">
          <label className="medical-lable">Tuổi</label>
          <input
            className="medical-input"
            type="text"
            name="patientAge"
            value={medical.patientAge}
            onChange={handleChange}
            disabled
          />
        </div>
          <div className="medical-form-group">
            <label className="medical-lable">Bệnh</label>
            <input
              className="medical-input"
              type="text"
              name="diagnosis"
              value={medical.diagnosis}
              onChange={handleChange}
            />
          </div>
          <div className="medical-form-group">
            <label className="medical-lable">Điều trị</label>
            <textarea
              className="medical-input"
              name="treatment"
              value={medical.treatment}
              onChange={handleChange}
              rows={4}
              style={{ resize: "vertical" }}
            />
          </div>
          <button type="button" onClick={updateMedical} disabled= {medical.patientName == ""}>Cập nhật</button>
      </form>
      {haveAppointment &&
        <div className="appointment-popup">
          <p>Có lịch hẹn</p>
          <button type="button" onClick={acceptAppointment}>Chấp nhận</button>
        </div>
      }
      {isSubmitform && 
      <div className="doctor-notify-container">
        <div className="doctor-notify">
          <p>Cập nhật thành công</p>
          <button onClick={exit} className="emp-detail-button">Thoát</button>
        </div>
      </div>
      }
    </div>
  );
}