import React, { useState, useEffect } from "react";
import "./QuanLyNhanVien.css";
import { useNavigate } from "react-router-dom";

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [filterEmp, setfilterEmp] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/api/Account/getAllNhanVien")
      .then((res) => {
        if (!res.ok) throw new Error("Lỗi khi gọi API");
        return res.json();
      })
      .then((data) => {
        setEmployees(data);
        setfilterEmp(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleSearch = () => {
    if(searchText == ""){
      setfilterEmp(employees);
    }
    else{
      const filtered = employees.filter( p =>
        p.cccdNV == searchText
      );
      setfilterEmp(filtered);
    }
  };

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
      <div className="employee-header">
        <h2 className="employee-title">Danh Sách Nhân Viên</h2>
        <input
          className="emp-search-input"
          type="text"
          placeholder="Nhập tên cần tìm..."
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          style={{
            width: "100%",
            padding: "8px",
            marginBottom: "10px",
            borderRadius: "4px",
          }}/>
        <button className="emp-search-btn" onClick={handleSearch}>
          Tìm kiếm
        </button>
        <button className="add-employee-btn" onClick={handleAdd}>
          Thêm nhân viên
        </button>
      </div>

      <div className="employee-container">
        <table className="employee-table">
          <thead>
            <tr>
              <th>Tên Nhân Viên</th>
              <th>Chức vụ</th>
              <th>SDT</th>
              <th>CCCD</th>
              <th>Cập nhật</th>
            </tr>
          </thead>
          <tbody>
            {filterEmp.map((emp) => (
              <tr key={emp.maNV}>
                <td>{emp.hoTenNV}</td>
                <td>{emp.chucVuNV}</td>
                <td>{emp.sdtNV}</td>
                <td>{emp.cccdNV}</td>
                <td>
                  <button className="employee-edit-btn" onClick={() => handleEdit(emp)}>
                    Chỉnh sửa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}