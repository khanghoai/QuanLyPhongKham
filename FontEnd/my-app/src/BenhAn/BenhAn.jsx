import React, { useState } from "react";
import "./BenhAn.css";
import { postData } from "../api/apiMethod";
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
    navigate("/ThanhToan", {state : BenhAn});
  }

  return (
    <div className="benh-an-container">
      <form className="benh-an-form" onSubmit={handleSubmit}>
        <h3 className="benh-an-title">Bệnh án</h3>

        <div className="benh-an-form-group">
          <label className="benh-an-lable">Tên bệnh nhân</label>
          <input
            className="benh-an-input"
            type="text"
            name="TenBN"
            value={BenhAn.benhNhan.hoTenBN || ""}
            onChange={handleChange}
          />
        </div>

        <div className="benh-an-form-group">
          <label className="benh-an-lable">Triệu chứng</label>
          <input
            className="benh-an-input"
            type="text"
            name="benhAn"
            value={BenhAn.benhAn || ""}
            onChange={handleChange}
          />
        </div>

        <div className="benh-an-form-group">
          <label className="benh-an-lable">Ngày khám</label>
          <input
            className="benh-an-input"
            type="date"
            name="ngayKham"
            value={BenhAn.ngayKham || ""}
            onChange={handleChange}
          />
        </div>

        <div className="benh-an-form-group">
          <label className="benh-an-lable">Trị bệnh</label>
          <textarea
            className="benh-an-text-area"
            name="triBenh"
            value={BenhAn.triBenh || ""}
            onChange={handleChange}
            rows={4}
            style={{ resize: "vertical" }}
          />
        </div>

        <div className="benh-an-form-group">
          <label className="benh-an-lable">Bác sĩ</label>
          <input
            className="benh-an-input"
            type="text"
            name="maNV"
            value={BenhAn.maNV || ""}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="benh-an-update benh-an-button">
          Cập Nhật
        </button>
        <button className="benh-an-thanh-toan benh-an-button" onClick={thanhToan}>
          Thanh Toán
        </button>
      </form>
    </div>
  );
}
