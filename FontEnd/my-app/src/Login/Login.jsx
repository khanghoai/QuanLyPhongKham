import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LOGIN } from "../api/api.js";
import "../api/apiMethod.js";
import { postData } from "../api/apiMethod.js";
import "./Login.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      username: username,
      password: password
    };
    const res = await postData(LOGIN,body);
    switch(res.employeePosition){
      case 'admin':
        navigate("/AdminPage", {
          state : {
            position : 'admin',
            cccd : "1"
          }});
        break;
      case 'nhanSu':
        navigate("/Employee", {
          state : {
            position : 'nhanSu',
            cccd : res.employeeCCCD,
          }
        })
        break;
      case 'leTan':
        navigate("/Patient", {
          state : {
            position : 'leTan',
            cccd : res.employeeCCCD,
          }
        })
        break;
      case 'bacSi':
        navigate(`/Doctor/${res.employeeID}`, {
          state : {
            position : 'bacSi',
            cccd : res.employeeCCCD,
          }
        })
        break;
      default :
        alert("Sai tài khoản hoặc mật khẩu");
        break;
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-form-group">
            <label className="login-lable" htmlFor="username">Tài khoản</label>
            <input
              className="login-username login-input"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="login-form-group">
            <label className="login-lable" htmlFor="password">Mật khẩu</label>
            <input
              className="login-password login-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="login-button">
            Đăng nhập
          </button>
        </form>
      </div>
    </div>
    
  );
}