import React, { useEffect, useState } from "react";
import "./updateEmployee.css";
import { postData } from "../api/api";
import { useLocation, useNavigate } from "react-router-dom";

export default function UpdateEmployee() {
  const navigate = useNavigate();
  const location = useLocation();
  const [nhanVien, setNhanVien] = useState(location.state);
  const [checkaccount, setCheckAccount] = useState("");

  useEffect(() => {
      const fetchCheckAccount = async () => {
      const result = await postData("http://localhost:8080/api/Account/checkAccount", nhanVien);
      setCheckAccount(result);
    };
    fetchCheckAccount();
  })


  const handleChange = (e) => {
    e.preventDefault();
    setNhanVien({ ...nhanVien, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    await postData("http://localhost:8080/api/Account/updateEmployee",nhanVien)
    navigate("/QuanLyNhanVien");
  };

  const createAccount = async (e) => {
    e.preventDefault();
    navigate("/CreateAccount", {state : nhanVien})
    
  }

  const fireEmployee = async (e) => {
    e.preventDefault();
    await postData("http://localhost:8080/api/Account/fireEmployee",nhanVien);
    navigate("/QuanLyNhanVien");
  }

  return (
    <div className="add-benhNhan-container">
      <form className="add-benhNhan-form" onSubmit={handleSubmit}>
        <h3>Nhân Viên</h3>

        <div className="form-group">
          <label>Họ tên</label>
          <input
            type="text"
            name="hoTenNV"
            value={nhanVien.hoTenNV || ""}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Số điện thoại</label>
          <input
            type="text"
            name="sdtNV"
            value={nhanVien.sdtNV || ""}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>CCCD</label>
          <input
            type="text"
            name="cccdNV"
            value={nhanVien.cccdNV || ""}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Giới tính</label>
          <input
            type="text"
            name="gioiTinhNV"
            value={nhanVien.gioiTinhNV || ""}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Ngày Sinh</label>
          <input
            type="date"
            name="ngaySinhNV"
            value={nhanVien.ngaySinhNV || ""}
            onChange={handleChange}
          />
        </div>
        <div className="button-group">
          <button type="submit" className="button">
            Cập Nhật
          </button>
          <button className="nghi-viec button" onClick={fireEmployee}>
            Nghỉ việc
          </button>
          {!checkaccount ? (
            <button className="button" onClick={createAccount}>
              Tạo tài khoản
            </button>
          ) : null}
        </div>
      </form>
    </div>
  );
}
