import { use, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GET_ROOMS } from "../api/api";
import { getData } from "../api/apiMethod";
import "./Room.css";

export default function Room() {
  const [rooms, setRooms] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [filterEmployees, setFilterEmployees] = useState([]);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const {position} = location.state || {};

  useEffect(() => {
    if(position != "nhanSu"){
      navigate("/");
    }
    else{
      const fun = async () =>{
        const res = await getData(GET_ROOMS);
        console.log(res);
        setRooms(res);
      }
      fun();
    }
  }, []);

  const searchEmp = () => {
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

  const addEmp = () => {
    navigate("/ThemThuoc");
  };

  return (
    <div className="room-page">
      <div className="room-side-bar">
        {rooms.map((r) => (
          <button>{r.roomName}</button>
        ))}
      </div>
      <div className="room-emp-container">
        <div className="room-emp-header">
          <h2 className="room-emp-title">Danh sách nhân viên</h2>
            <input
              className="room-emp-search-input "
              type="text"
              placeholder="Nhập tên cần tìm..."
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                marginBottom: "10px",
                borderRadius: "4px",
              }}
            />
            <button className="room-emp-search-btn" onClick={searchEmp}>
              Tìm kiếm
            </button>
            <button className="room-emp-add-btn" onClick={addEmp}>
              Thêm nhân viên
            </button>
        </div>

      <div className="medicine-container">
        <table className="medicine-table ">
          <thead>
            <tr>
              <th>Tên nhân viên</th>
              <th>Ca làm việc</th>
              <th>Trạng thái</th>
              <th>Chỉnh sửa</th>
            </tr>
          </thead>
          <tbody>
            {filterEmployees.map((emp) => (
              <tr key={emp.employeeID}>
                <td>{emp.tenThuoc}</td>
                <td>{emp.giaNhap}</td>
                <td>{emp.soLuong}</td>
                <td>{emp.noiNhap}</td>
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
    </div>
  );
}