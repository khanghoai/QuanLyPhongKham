import React, { useEffect, useState } from "react";
import "./QuanLyLichHen.css";
import { Navigate, useNavigate } from "react-router-dom";
import { postData } from "../api/apiMethod";

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
      <div className="patient-header">
        <div className="buttons">
          <h2 className="patient-title">Quản lý bệnh nhân</h2>
          <input
            className="patient-search-input"
            type="text"
            placeholder="Nhập tên cần tìm..."
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            />
          <button className="patient-search-btn" onClick={handleSearch}>
            Tìm kiếm
          </button>
          <button className="add-patient-btn" onClick={handleAddAppointment}>
            Thêm bệnh nhân
          </button>
        </div>
      </div>

      <div className="patient-container">
        <table className="patient-table">
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
                  {p.benhNhan.xuatVien == 0 ? (
                    <button
                      className="patient-edit-btn"
                      onClick={() => handleAction("Sua", p)}
                    >
                      Cập Nhật
                    </button>
                  ) : (<p>Đã xuất viện</p>) }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
