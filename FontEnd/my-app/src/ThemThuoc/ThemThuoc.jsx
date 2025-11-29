import React, { useState } from "react";
import "./ThemThuoc.css";
import { postData } from "../api/apiMethod";

export default function ThemThuoc() {
  const [medicine, setMedicine] = useState({
    tenThuoc : "",
    noiNhap : "",
    giaNhap : "",
    giaBan : "",
    soLuong : ""
  })

  const handleChange = (e) => {
    e.preventDefault();
    setMedicine({ ...medicine, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) =>{
    e.preventDefault();
    console.log()
    const result = await postData("http://localhost:8080/api/Medicine/addMedicine", medicine)
  }


  return (
    <div className="add-medicine-container">
      <form className="add-medicine-form" onSubmit={handleSubmit}>
      <h2 className="add-medicine-title">Thêm thuốc</h2>
        <div className="add-medicine-form-group">
          <label className="add-medicine-lable">Tên thuốc</label>
          <input
            className="add-medicine-input"
            type="text"
            placeholder="Nhập tên thuốc"
            onChange={handleChange}
            name="tenThuoc"
            value={medicine.tenThuoc} />
        </div>

        <div className="add-medicine-form-group">
          <label className="add-medicine-lable">Nhà cung cấp</label>
          <input
            className="add-medicine-input"
            type="text"
            placeholder="Nhập tên nhà cung cấp"
            onChange={handleChange}
            name="noiNhap"
            value={medicine.noiNhap} />
        </div>

        <div className="add-medicine-form-group">
          <label className="add-medicine-lable">Giá Nhập</label>
          <input
            className="add-medicine-input"
            type="number"
            placeholder="Nhập giá nhập"
            onChange={handleChange}
            name="giaNhap"
            value={medicine.giaNhap} />
        </div>

        <div className="add-medicine-form-group">
          <label className="add-medicine-lable">Giá Bán</label>
          <input
            className="add-medicine-input"
            type="number"
            placeholder="Nhập giá bán"
            onChange={handleChange}
            name="giaBan"
            value={medicine.giaBan} />
        </div>

        <div className="add-medicine-form-group">
          <label className="add-medicine-lable">Số lượng</label>
          <input
            className="add-medicine-input"
            type="number"
            placeholder="Nhập số lượng"
            onChange={handleChange}
            name="soLuong"
            value={medicine.soLuong}/>
        </div>
        <div className="add-medicine-button-group">
          <button type="submit" className="add-medicine-button">Thêm</button>
        </div>
      </form>
    </div>
  );
}

