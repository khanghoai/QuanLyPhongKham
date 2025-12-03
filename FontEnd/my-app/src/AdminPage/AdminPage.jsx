import React, { use, useEffect, useState } from "react";
import "./AdminPage.css";
import { postData } from "../api/apiMethod";
import { useLocation, useNavigate } from "react-router-dom";
import { ADD_ROOM, CREATE_ACCOUNT } from "../api/api";

export default function AdminPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [BenhAn, setBenhAn] = useState(location.state);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [roomName, setRoomName] = useState("");
  const [roomNum, setRoomNum] = useState("");

  useEffect(() => {
    if(location.state != "admin"){
        navigate("/");
    }
  },[])

  const addRoom = async (e) =>{
    e.preventDefault();
    const body = {
      roomName : roomName,
      roomNum : roomNum
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
        </div>
        <button onClick={addRoom}>Thêm phòng</button>
        <button onClick={() => {navigate("/")}}>Đăng xuất</button>
    </div>
  );
}
