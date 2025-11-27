import React, { useState } from "react";
import "./BenhAn.css";
import { postData } from "../api/api";
import { useLocation, useNavigate } from "react-router-dom";

export default function BenhAn() {
  const navigate = useNavigate();
  const location = useLocation();
  const [BenhAn, setBenhAn] = useState(location.state);
  const handleChange = (e) => {
    e.preventDefault();
    setBenhAn({ ...BenhAn, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await postData("http://localhost:8080/api/benhVien/updatePatient",BenhAn)
    navigate("/QuanLyLichHen");
  };

  const thanhToan = async (e) =>{
    e.preventDefault();
    console.log("thanh toan") 
  }

  return (
    <div className="add-benhNhan-container">
      <form className="add-benhNhan-form" onSubmit={handleSubmit}>
        <h3>Bệnh án</h3>

        <div className="form-group">
          <label>Tên bệnh nhân</label>
          <input
            type="text"
            name="TenBN"
            value={BenhAn.benhNhan.hoTenBN || ""}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Triệu chứng</label>
          <input
            type="text"
            name="benhAn"
            value={BenhAn.benhAn || ""}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Ngày khám</label>
          <input
            type="date"
            name="ngayKham"
            value={BenhAn.ngayKham || ""}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Trị bệnh</label>
          <textarea
            name="triBenh"
            value={BenhAn.triBenh || ""}
            onChange={handleChange}
            rows={4}
            style={{ resize: "vertical" }}
          />
        </div>

        <div className="form-group">
          <label>Bác sĩ</label>
          <input
            type="text"
            name="maNV"
            value={BenhAn.maNV || ""}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="submit-btn">
          Cập Nhật
        </button>
        <button className="submit-btn" onClick={thanhToan}>
          Thanh Toán
        </button>
      </form>
    </div>
  );
}
