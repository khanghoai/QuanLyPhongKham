import React, { useState } from "react";
import "./CreateAccount.css";
import "../api/api.js"
import { getData, postData } from "../api/api.js";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";

export default function CreateAccount() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [result, setResult] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      username: username,
      password: password,
      nhanVien: location.state
    };
    const res = await postData("http://localhost:8080/api/Account/createAccount",body);
    navigate("/QuanLyNhanVien");
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Tài khoản</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Mật khẩu</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="login-button">
          Tạo Tài Khoản
        </button>
      </form>
    </div>
  );
}