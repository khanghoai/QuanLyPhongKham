import React, { useState } from "react";
import "./ThemBenhNhan.css";
import { postData } from "../api/api";
import { useNavigate } from "react-router-dom";

export default function ThemBenhNhan() {
  const [benhNhan, setBenhNhan] = useState({
    hoTenBN: "",
    sdtBN: "",
    cccdBN: "",
    gioiTinhBN: "",
    ngaySinhBN: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setBenhNhan({ ...benhNhan, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await postData("http://localhost:8080/api/benhVien/themBenhNhan",benhNhan)
    navigate("/QuanLyLichHen");
  };

  return (
    <div className="add-patient-container">
      <form className="add-patient-form" onSubmit={handleSubmit}>
        <h3 className="add-patient-title">Thêm bệnh nhân</h3>

        <div className="add-patient-form-group">
          <label className="add-patient-lable">Họ Tên</label>
          <input
            className="add-patient-input"
            type="text"
            name="hoTenBN"
            value={benhNhan.hoTenBN}
            onChange={handleChange}
          />
        </div>

        <div className="add-patient-form-group">
          <label className="add-patient-lable">Số điện thoại</label>
          <input
            className="add-patient-input"
            type="text"
            name="sdtBN"
            value={benhNhan.sdtBN}
            onChange={handleChange}
          />
        </div>

        <div className="add-patient-form-group">
          <label className="add-patient-lable">CCCD</label>
          <input
            className="add-patient-input"
            type="text"
            name="cccdBN"
            value={benhNhan.cccdBN}
            onChange={handleChange}
          />
        </div>

        <div className="add-patient-form-group">
          <label className="add-patient-lable">Giới tính</label>
          <input
            className="add-patient-input"
            type="text"
            name="gioiTinhBN"
            value={benhNhan.gioiTinhBN}
            onChange={handleChange}
          />
        </div>

        <div className="add-patient-form-group">
          <label className="add-patient-lable">Ngày sinh</label>
          <input
            className="add-patient-input"
            type="date"
            name="ngaySinhBN"
            value={benhNhan.ngaySinhBN}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="add-patient-button">
          Thêm
        </button>
        
      </form>
    </div>
  );
}
