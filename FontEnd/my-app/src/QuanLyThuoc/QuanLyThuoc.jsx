import React, { useState, useEffect } from "react";
import "./QuanLyThuoc.css";
import { useNavigate } from "react-router-dom";

export default function QuanLyThuoc() {
  const [medicine, setMedicine] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/api/Medicine/getAllMedicine")
      .then((res) => {
        if (!res.ok) throw new Error("Lỗi khi gọi API");
        return res.json();
      })
      .then((data) => {
        setMedicine(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleAdd = () => {
    navigate("/ThemThuoc");
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
          Thêm thuốc
        </button>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Tên thuốc</th>
              <th>Giá Nhập</th>
              <th>Số lượng</th>
              <th>Nơi Nhập</th>
            </tr>
          </thead>
          <tbody>
            {medicine.map((med) => (
              <tr key={med.maThuoc}>
                <td>{med.tenThuoc}</td>
                <td>{med.giaNhap}</td>
                <td>{med.soLuong}</td>
                <td>{med.noiNhap}</td>
                <td>
                  <button className="edit-btn" onClick={() => handleEdit(med)}>
                    Chỉnh sửa
                  </button>
                </td>
              </tr>
            ))}

            {medicine.length === 0 && (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  Không có thuốc
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}