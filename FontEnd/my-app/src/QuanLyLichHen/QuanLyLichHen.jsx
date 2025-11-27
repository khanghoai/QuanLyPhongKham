import React, { useEffect, useState } from "react";
import "./QuanLyLichHen.css";
import { Navigate, useNavigate } from "react-router-dom";
import { postData } from "../api/api";

export default function QuanLyLichHen() {
  const [benhNhans, setBenhNhans] = useState([]);
  const [filteredBenhNhans, setFilteredBenhNhans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/api/benhVien/getAllBenhAn")
      .then((res) => {
        if (!res.ok) throw new Error("Lỗi khi gọi API");
        return res.json();
      })
      .then((data) => {
        setBenhNhans(data);
        setFilteredBenhNhans(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);
  

  const handleSearch = async () => {
    if(searchText == ""){
      setFilteredBenhNhans(benhNhans);
    }
    else{
      const filtered = benhNhans.filter(p =>
        p.benhNhan.cccdBN == searchText
      );
      setFilteredBenhNhans(filtered);
    }
  };

  const handleAddAppointment = () => {
    navigate("/ThemBenhNhan");
  };

  const handleAction = (action,benhAn) => {
    if(action == "Sua"){
      navigate("/BenhAn",{state : benhAn})
    }
  };

  return (
    <div className="patient-container">
      <div className="header">
        <div className="buttons">
          <input
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
          <button className="search-btn" onClick={handleSearch}>
            Tìm kiếm
          </button>
          <button className="add-btn" onClick={handleAddAppointment}>
            Tạo lịch hẹn
          </button>
        </div>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Tên Bệnh Nhân</th>
              <th>SDT</th>
              <th>CCCD</th>
              <th>Tình trạng</th>
            </tr>
          </thead>
          <tbody>
            {filteredBenhNhans.map((p) => (
              <tr key={p.benhNhan.maBN}>
                <td>{p.benhNhan.hoTenBN}</td>
                <td>{p.benhNhan.sdtBN}</td>
                <td>{p.benhNhan.cccdBN}</td>
                <td className="action-cell">
                  {p.benh_an == null && (
                    <button
                      className="action-btn"
                      onClick={() => handleAction("Sua", p)}
                    >
                      Cập Nhật
                    </button>
                  )}
                </td>
              </tr>
            ))}

            {benhNhans.length === 0 && (
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
