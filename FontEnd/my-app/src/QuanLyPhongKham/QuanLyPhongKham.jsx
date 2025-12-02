import React, { useState, useEffect } from "react";
import "./QuanLyPhongKham.css";
import { useNavigate } from "react-router-dom";
import { getData, postData } from "../api/apiMethod";
import { GET_ALL_PHONG_KHAM } from "../api/api";

export default function QuanLyPhongKham() {
  const [phongKhams, setPhongKhams] = useState([]);
  const [filterPhongKhams, setFilterPhongKhams] = useState([]);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fecth = async () => {
      const res = await getData(GET_ALL_PHONG_KHAM);
      setPhongKhams(res);
      setFilterPhongKhams(res);
    }
    fecth();
  }, []);

  const countEmp = (e) =>{
    const c = 0;
    e.forEach(element => {
      c += 1;
    });
    return c;
  }

  const handleSearch = () => {
    if(searchText == ""){
      setFilterPhongKhams(phongKhams);
    }
    else{
      const filtered = phongKhams.filter( p =>
        p.tenPhongKham == searchText
      );
      setFilterPhongKhams(filtered);
    }
  };

  const handleAdd = () => {
    navigate("/ThemNhanVien");
  };

  const handleEdit = (phongKham) =>{
    navigate("/Updatephong-kham", {state : phongKham})
  }

  return (
    <div className="phong-kham-container">
      <div className="phong-kham-header">
        <h2 className="phong-kham-title">Danh Sách Phòng khám</h2>
        <input
          className="phong-kham-search-input"
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
        <button className="phong-kham-search-btn" onClick={handleSearch}>
          Tìm kiếm
        </button>
        <button className="add-phong-kham-btn" onClick={handleAdd}>
          Thêm phòng khám
        </button>
      </div>

      <div className="phong-kham-container">
        <table className="phong-kham-table">
          <thead>
            <tr>
              <th>Tên phòng ban</th>
              <th>Số lượng</th>
              <th>Cập nhật</th>
            </tr>
          </thead>
          <tbody>
            {filterPhongKhams.map((p) => (
              <tr key={p.maPhongKham}>
                <td>{p.tenPhongKham}</td>
                <td>{countEmp(p.nhanVien)}</td>
                <td>
                  <button className="phong-kham-edit-btn" onClick={() => handleEdit(p)}>
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