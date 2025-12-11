import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import SockJS from "sockjs-client";
import * as Stomp from "stompjs";
import "./Doctor.css";

export default function Doctor() {
  const [haveAppointment,setHaveAppointment] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
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
    if(position != "bacSi"){
      navigate("/");
    }
  }, []);

  useEffect(() => {
    const socket = new SockJS("http://localhost:8080/ws");
    const stompClient = Stomp.over(socket);
    stompClient.connect({}, () => {
      stompClient.subscribe(`/topic/appointment/${doctorID}`, (message) => {
        const appointment = JSON.parse(message.body);
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

  const updateMedical = () => {

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
            <input
              className="medical-input"
              type="text"
              name="treatment"
              value={medical.treatment}
              onChange={handleChange}
            />
          </div>
      </form>
      {!haveAppointment &&
        <div className="appointment-popup">
          <p>Có lịch hẹn</p>
          <button type="button">Chấp nhận</button>
        </div>
      }
    </div>
  );
}