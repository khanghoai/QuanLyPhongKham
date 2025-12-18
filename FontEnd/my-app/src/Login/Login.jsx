import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LOGIN } from "../api/api.js";
import "../api/apiMethod.js";
import { postData } from "../api/apiMethod.js";
import "./Login.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [wrong, setWrong] = useState(false);
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
      case 'Nhân sự':
        navigate("/Room", {
          state : {
            position : 'Nhân sự',
            cccd : res.employeeCCCD,
          }
        })
        break;
      case 'Lễ tân':
        navigate("/Patient", {
          state : {
            position : 'Lễ tân',
            cccd : res.employeeCCCD,
          }
        })
        break;
      case 'Bác sĩ':
        navigate(`/Doctor/${res.employeeID}`, {
          state : {
            position : 'Bác sĩ',
            cccd : res.employeeCCCD,
          }
        })
        break;
      case 'Nhà thuốc':
        navigate("/Medicine", {
          state : {
            position : 'Nhà thuốc',
            cccd : res.employeeCCCD,
          }
        })
        break;
      case 'Thu ngân':
        navigate("/ThanhToan", {
          state : {
            position : 'Thu ngân',
            cccd : res.employeeCCCD,
          }
        })
        break;
      default :
        setWrong(true);
        break;
    }
  };

  const wrongComfirm = () => {
    setWrong(false);
  }

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
      {wrong &&
        <div className="notify-container">
          <div className="notify">
            <p>Tài khoản hoặc mật khẩu sai</p>
            <div className="button-group">
              <button className="button" onClick={wrongComfirm}>Xác nhận</button>
            </div>
          </div>
        </div>
      }
      
    </div>
  );
}