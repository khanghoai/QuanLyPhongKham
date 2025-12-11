import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ADD_ROOM } from "../api/api";
import { postData } from "../api/apiMethod";
import "./AdminPage.css";

export default function AdminPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const {position, cccd} = location.state;
  const [roomName, setRoomName] = useState("");
  const [roomNum, setRoomNum] = useState("");
  const [disease, setDisease] = useState("");

  useEffect(() => {
    if(position != "admin"){
        navigate("/");
    }
  },[])

  const addRoom = async (e) =>{
    e.preventDefault();
    const body = {
      roomName : roomName,
      roomNum : roomNum,
      disease : disease
    }
    await postData(ADD_ROOM,body);
    alert("Thêm phòng thành công");
  }

  const addEmployee = async (e) =>{
    e.preventDefault();
    navigate("/EmployeeDetail", {
      state : {
        position : 'admin',
        emp : null,
        fun : 'add'
      }
      //fun chỉ có thể là add hoặc update. Nếu fun là update thì emp phải có giá trị
    })
  }

  return (
    <div className="admin-btn-container">
      <button onClick={addEmployee}>Thêm nhân viên</button>
      <div className="add-phong-form">
        <input
          type="text"
          value={roomName}
          onChange={e => setRoomName(e.target.value)}
          placeholder="Tên phòng"/>
        <input 
          type="text"
          value={roomNum}
          onChange={e => setRoomNum(e.target.value)}
          placeholder="Số phòng"/>
        <input 
          type="text"
          value={disease}
          onChange={e => setDisease(e.target.value)}
          placeholder="Triệu chứng"/>
      </div>
      <button onClick={addRoom}>Thêm phòng</button>
      <button onClick={() => {navigate("/")}}>Đăng xuất</button>
    </div>
  );
}
