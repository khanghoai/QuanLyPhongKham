import React, { useState, useEffect } from "react";
import "./QuanLyNhanVien.css";
import { useNavigate } from "react-router-dom";

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/api/Account/getAllNhanVien")
      .then((res) => {
        if (!res.ok) throw new Error("Lỗi khi gọi API");
        return res.json();
      })
      .then((data) => {
        setEmployees(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleAdd = () => {
    navigate("/ThemNhanVien");
  };

  const handleEdit = (nhanVien) =>{
    navigate("/UpdateEmployee", {state : nhanVien})
  }

  if (loading) return <p>Đang tải dữ liệu...</p>;
  if (error) return <p style={{ color: "red" }}>Lỗi: {error}</p>;

  return (
    <div className="employee-container">
      <div className="header">
        <h2>Danh Sách Nhân Viên</h2>
        <button className="add-btn" onClick={handleAdd}>
          Thêm nhân viên
        </button>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Tên Nhân Viên</th>
              <th>Chức vụ</th>
              <th>SDT</th>
              <th>CCCD</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.maNV}>
                <td>{emp.hoTenNV}</td>
                <td>{emp.chucVuNV}</td>
                <td>{emp.sdtNV}</td>
                <td>{emp.cccdNV}</td>
                <td>
                  <button className="edit-btn" onClick={() => handleEdit(emp)}>
                    Chỉnh sửa
                  </button>
                </td>
              </tr>
            ))}

            {employees.length === 0 && (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  Không có dữ liệu nhân viên
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}