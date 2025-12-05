import React, { useState, useEffect, use, useContext } from "react";
import "./QuanLyThuoc.css";
import { useNavigate } from "react-router-dom";

export default function QuanLyThuoc() {
  const [medicine, setMedicine] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterMedicine, setfilterMedicine] = useState([]);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/api/Medicine/getAllMedicine")
      .then((res) => {
        if (!res.ok) throw new Error("Lỗi khi gọi API");
        return res.json();
      })
      .then((data) => {
        setMedicine(data);
        setfilterMedicine(data)
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

  const handleEdit = (medicine) =>{
    navigate("/UpdateMedicine", {state : medicine})
  }

  const handleSearch = () => {
    if(searchText == ""){
      setfilterMedicine(medicine);
    }
    else{
      const filtered = medicine.filter( p =>
        searchText.includes(p.tenThuoc)
      );
      setfilterMedicine(filtered);
    }
  };

  return (
    <div className="medicine-container">
      <div className="medicine-header">
        <h2 className="medicine-title">Danh sách thuốc</h2>
        <input
          className="medicine-search-input "
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
        <button className="medicine-search-btn" onClick={handleSearch}>
          Tìm kiếm
        </button>
        <button className="add-medicine-btn" onClick={handleAdd}>
          Thêm thuốc
        </button>
      </div>

      <div className="medicine-container">
        <table className="medicine-table ">
          <thead>
            <tr>
              <th>Tên thuốc</th>
              <th>Giá Nhập</th>
              <th>Số lượng</th>
              <th>Nơi Nhập</th>
            </tr>
          </thead>
          <tbody>
            {filterMedicine.map((med) => (
              <tr key={med.maThuoc}>
                <td>{med.tenThuoc}</td>
                <td>{med.giaNhap}</td>
                <td>{med.soLuong}</td>
                <td>{med.noiNhap}</td>
                <td>
                  <button className="medicine-edit-btn" onClick={() => handleEdit(med)}>
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