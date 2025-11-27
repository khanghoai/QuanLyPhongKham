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
    <div className="add-benhNhan-container">
      <form className="add-benhNhan-form" onSubmit={handleSubmit}>
        <h3>Thêm bệnh nhân</h3>

        <div className="form-group">
          <label>Họ Tên</label>
          <input
            type="text"
            name="hoTenBN"
            value={benhNhan.hoTenBN}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Số điện thoại</label>
          <input
            type="text"
            name="sdtBN"
            value={benhNhan.sdtBN}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>CCCD</label>
          <input
            type="text"
            name="cccdBN"
            value={benhNhan.cccdBN}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Giới tính</label>
          <input
            type="text"
            name="gioiTinhBN"
            value={benhNhan.gioiTinhBN}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Ngày sinh</label>
          <input
            type="date"
            name="ngaySinhBN"
            value={benhNhan.ngaySinhBN}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="submit-btn">
          Thêm
        </button>
      </form>
    </div>
  );
}
