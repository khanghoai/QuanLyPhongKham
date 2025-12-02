import React, { useEffect, useState } from "react";
import "./updateMedicine.css";
import { postData } from "../api/apiMethod";
import { useLocation, useNavigate } from "react-router-dom";

export default function UpdateMedicine() {
  const navigate = useNavigate();
  const location = useLocation();
  const [medicine, setMedicine] = useState(location.state);

  const handleChange = (e) => {
    e.preventDefault();
    setMedicine({ ...medicine, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await postData("http://localhost:8080/api/Medicine/updateMedicine",medicine);
    navigate("/QuanLyThuoc");
  };

  const deleteMedicine = async (e) => {
    e.preventDefault();
    const res = await postData("http://localhost:8080/api/Medicine/deleteMedicine",medicine);
    navigate("/QuanLyThuoc");
  }

  return (
    <div className="up-medicine-container">
      <form className="up-medicine-form" onSubmit={handleSubmit}>
      <h2 className="up-medicine-title">Thêm thuốc</h2>
        <div className="up-medicine-form-group">
          <label className="up-medicine-lable">Tên thuốc</label>
          <input
            className="up-medicine-input"
            type="text"
            placeholder="Nhập tên thuốc"
            onChange={handleChange}
            name="tenThuoc"
            value={medicine.tenThuoc} />
        </div>

        <div className="up-medicine-form-group">
          <label className="up-medicine-lable">Nhà cung cấp</label>
          <input
            className="up-medicine-input"
            type="text"
            placeholder="Nhập tên nhà cung cấp"
            onChange={handleChange}
            name="noiNhap"
            value={medicine.noiNhap} />
        </div>

        <div className="up-medicine-form-group">
          <label className="up-medicine-lable">Giá Nhập</label>
          <input
            className="up-medicine-input"
            type="number"
            placeholder="Nhập giá nhập"
            onChange={handleChange}
            name="giaNhap"
            value={medicine.giaNhap} />
        </div>

        <div className="up-medicine-form-group">
          <label className="up-medicine-lable">Giá Bán</label>
          <input
            className="up-medicine-input"
            type="number"
            placeholder="Nhập giá bán"
            onChange={handleChange}
            name="giaBan"
            value={medicine.giaBan} />
        </div>

        <div className="up-medicine-form-group">
          <label className="up-medicine-lable">Số lượng</label>
          <input
            className="up-medicine-input"
            type="number"
            placeholder="Nhập số lượng"
            onChange={handleChange}
            name="soLuong"
            value={medicine.soLuong}/>
        </div>
        <div className="up-medicine-button-group">
          <button type="submit" className="up-medicine-button up-medicine-update">Cập nhập</button>
          <button className="up-medicine-button up-medicine-delete" onClick={deleteMedicine}>Xóa</button>
        </div>
      </form>
    </div>
  );
}
