import React, { useState } from "react";
import "./ThemNhanVien.css";
import { postData } from "../api/api";

export default function AddEmployee() {
  const [employee, setEmployee] = useState({
    hoTenNV: "",
    sdtNV: "",
    cccdNV: "",
    gioiTinhNV: "",
    ngaySinhNV: "",
    chucVuNV: "",
  });

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await postData("http://localhost:8080/api/Account/AddNhanVien",employee)
  };

  return (
    <div className="add-emp-container">
      <form className="add-emp-form" onSubmit={handleSubmit}>
        <h3 className="add-emp-title">Thêm nhân viên</h3>
        <div className="add-emp-form-group">
          <label className="add-emp-lable">Tên Nhân Viên</label>
          <input
            class="add-emp-input"
            type="text"
            name="hoTenNV"
            value={employee.hoTenNV}
            onChange={handleChange}
          />
        </div>

        <div className="add-emp-form-group">
          <label className="add-emp-lable">Số điện thoại</label>
          <input
            class="add-emp-input"
            type="text"
            name="sdtNV"
            value={employee.sdtNV}
            onChange={handleChange}
          />
        </div>

        <div className="add-emp-form-group">
          <label className="add-emp-lable">CCCD</label>
          <input
            class="add-emp-input"
            type="text"
            name="cccdNV"
            value={employee.cccdNV}
            onChange={handleChange}
          />
        </div>

        <div className="add-emp-form-group">
          <label className="add-emp-lable">Giới tính</label>
          <input
            class="add-emp-input"
            type="text"
            name="gioiTinhNV"
            value={employee.gioiTinhNV}
            onChange={handleChange}
          />
        </div>

        <div className="add-emp-form-group">
          <label className="add-emp-lable">Ngày sinh</label>
          <input
            class="add-emp-input"
            type="date"
            name="ngaySinhNV"
            value={employee.ngaySinhNV}
            onChange={handleChange}
          />
        </div>

        <div className="add-emp-form-group">
          <label className="add-emp-lable">Chức vụ</label>
          <select
            className="add-emp-input"
            name="chucVuNV"
            value={employee.chucVuNV}
            onChange={handleChange}>
            <option value="">Chọn chức vụ</option>
            <option value="bacSi">Bác sĩ</option>
            <option value="leTan">Lễ Tân</option>
            <option value="nhaThuoc">Nhà thuốc</option>
          </select>
        </div>
        <div className="add-emp-button-group">
          <button type="submit" className="add-emp-button">
            Thêm
          </button>
        </div>
        
      </form>
    </div>
  );
}
