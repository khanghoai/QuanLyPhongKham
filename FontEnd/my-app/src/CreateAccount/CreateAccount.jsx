import React, { useState } from "react";
import "./CreateAccount.css";
import "../api/apiMethod.js"
import { getData, postData } from "../api/apiMethod.js";
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
    <div className="create-account-wrapper">
      <div className="create-account-container">
        <form className="create-account-form" onSubmit={handleSubmit}>
          <div className="create-account-form-group">
            <label className="create-account-label" htmlFor="username">Tài khoản</label>
            <input
              className="create-account-input"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="create-account-label" htmlFor="password">Mật khẩu</label>
            <input
              className="create-account-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="create-account-button">
            Tạo Tài Khoản
          </button>
        </form>
      </div>
    </div>
  );
}