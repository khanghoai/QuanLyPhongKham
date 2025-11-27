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
    <div className="add-employee-container">
      <form className="add-employee-form" onSubmit={handleSubmit}>
        <h3>Thêm nhân viên</h3>

        <div className="form-group">
          <label>Tên Nhân Viên</label>
          <input
            type="text"
            name="hoTenNV"
            value={employee.hoTenNV}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Số điện thoại</label>
          <input
            type="text"
            name="sdtNV"
            value={employee.sdtNV}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>CCCD</label>
          <input
            type="text"
            name="cccdNV"
            value={employee.cccdNV}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Giới tính</label>
          <input
            type="text"
            name="gioiTinhNV"
            value={employee.gioiTinhNV}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Ngày sinh</label>
          <input
            type="date"
            name="ngaySinhNV"
            value={employee.ngaySinhNV}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Chức vụ</label>
          <input
            type="text"
            name="chucVuNV"
            value={employee.chucVuNV}
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
