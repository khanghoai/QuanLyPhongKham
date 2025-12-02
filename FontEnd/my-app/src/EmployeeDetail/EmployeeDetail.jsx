import React, { useEffect, useState } from "react";
import './EmployeeDetail.css'
import { postData } from "../api/apiMethod";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import { ADD_EMPLOYEE } from "../api/api";

export default function AddEmployee() {
  const [employee, setEmployee] = useState({
    employeeName: "",
    employeePhone: "",
    employeeCCCD: "",
    employeeSex: "",
    employeeBirth: "",
    employeePosition: "",
  });
  const navigate = useNavigate();
  const location = useLocation();
  const {position, emp, fun} = location.state || {};

  useEffect(() => {
    if(position != 'admin' && position != 'nhanSu'){
      navigate("/");
    }
    if(fun == "update"){
      setEmployee(emp);
    }
  },[])

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await postData(ADD_EMPLOYEE,employee)
    navigate("/quanLyNhanVien");
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
            name="employeeName"
            value={employee.employeeName}
            onChange={handleChange}
          />
        </div>

        <div className="add-emp-form-group">
          <label className="add-emp-lable">Số điện thoại</label>
          <input
            class="add-emp-input"
            type="number"
            name="employeePhone"
            value={employee.employeePhone}
            onChange={handleChange}
          />
        </div>

        <div className="add-emp-form-group">
          <label className="add-emp-lable">CCCD</label>
          <input
            class="add-emp-input"
            type="text"
            name="employeeCCCD"
            value={employee.employeeCCCD}
            onChange={handleChange}
          />
        </div>

        <div className="add-emp-form-group">
          <label className="add-emp-lable">Giới tính</label>
          <input
            class="add-emp-input"
            type="text"
            name="employeeSex"
            value={employee.employeeSex}
            onChange={handleChange}
          />
        </div>

        <div className="add-emp-form-group">
          <label className="add-emp-lable">Ngày sinh</label>
          <input
            class="add-emp-input"
            type="date"
            name="employeeBirth"
            value={employee.employeeBirth}
            onChange={handleChange}
          />
        </div>

        <div className="add-emp-form-group">
          <label className="add-emp-lable">Chức vụ</label>
          <select
            className="add-emp-input"
            name="employeePosition"
            value={employee.employeePosition}
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
