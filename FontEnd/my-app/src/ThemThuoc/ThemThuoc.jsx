import React, { useState } from "react";
import "./ThemThuoc.css";
import { postData } from "../api/api";

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
      <h2>Thêm thuốc</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Tên thuốc</label>
          <input type="text"
            placeholder="Nhập tên thuốc"
            onChange={handleChange}
            name="tenThuoc"
            value={medicine.tenThuoc} />
        </div>

        <div className="form-group">
          <label>Nhà cung cấp</label>
          <input type="text"
            placeholder="Nhập tên nhà cung cấp"
            onChange={handleChange}
            name="noiNhap"
            value={medicine.noiNhap} />
        </div>

        <div className="form-group">
          <label>Giá Nhập</label>
          <input type="number"
            placeholder="Nhập giá nhập"
            onChange={handleChange}
            name="giaNhap"
            value={medicine.giaNhap} />
        </div>

        <div className="form-group">
          <label>Giá Bán</label>
          <input type="number"
            placeholder="Nhập giá bán"
            onChange={handleChange}
            name="giaBan"
            value={medicine.giaBan} />
        </div>

        <div className="form-group">
          <label>Số lượng</label>
          <input type="number"
            placeholder="Nhập số lượng"
            onChange={handleChange}
            name="soLuong"
            value={medicine.soLuong} />
        </div>

        <button type="submit" className="submit-btn">Thêm</button>
      </form>
    </div>
  );
}

