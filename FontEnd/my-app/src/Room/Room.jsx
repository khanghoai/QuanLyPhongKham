import { use, useEffect, useState } from "react";
import { matchRoutes, useLocation, useNavigate } from "react-router-dom";
import { GET_ROOMS } from "../api/api";
import { getData } from "../api/apiMethod";
import "./Room.css";

export default function Room() {
  const [rooms, setRooms] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [filterEmployees, setFilterEmployees] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [roomSelected, setRoomSelected] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const {position} = location.state || {};
  const MORINGSHIFT = {start: {h: 8, m: 0} , end : {h: 11, m:0}}
  const NOONSHIFT = {start: {h: 14, m: 0} , end : {h: 17, m: 0}}
  const EVENINGSHIFT = {start: {h: 19, m: 0} , end : {h: 22, m: 0}}
  const days = ["sun","mon","tue","wed","thu","fri","sat"];



  useEffect(() => {
    if(position != "Nhân sự"){
      navigate("/");
    }
    else{
      const fun = async () =>{
        const res = await getData(GET_ROOMS);
        setRooms(res);
        choseRoom(res[0])
      }
      fun();
    }
    getShiftNow();
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

  const choseRoom = (room) => {
    setRoomSelected(room);
    setFilterEmployees(room.employees);
  }

  const editCalendar = (emp) => {
    navigate("/Calendar",{
      state : {
        position : "Nhân sự",
        emp : emp,
        fun : "update"
      }
    })
  }

  const getShiftNow = () => {
    if(checkShift(MORINGSHIFT)){
      return "Sáng"
    }
    else if(checkShift(NOONSHIFT)){
      return "Chiều"
    }
    else if(checkShift(EVENINGSHIFT)){
      return "Tối"
    }
    return "Không có"
  }

  const checkShift = (shift) => {
    const time = new Date();  
    const shiftStart = new Date();
    const shiftEnd = new Date();
    shiftStart.setHours(shift.start.h,shift.start.m,0);
    shiftEnd.setHours(shift.end.h,shift.end.m,0);
    if(time >= shiftStart && time <= shiftEnd){
      return true;
    }
    return false;
  }

  return (
    <div className="room-page">
      <div className="room-side-bar">
        {rooms.map((r) => (
          <button key={r.roomName}
            className={roomSelected.roomName == r.roomName ? "room-side-bar-button-active" : ""} 
            onClick={() => choseRoom(r)}>
            {r.roomName}
          </button>
        ))}
      </div>
      <div className="room-emp-container">
        <div className="room-emp-header">
          <h2 className="room-emp-title">Danh sách nhân viên</h2>
          <div>
            <input
              className="room-emp-search-input"
              type="text"
              placeholder="Nhập tên cần tìm..."
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
            />
            <button className="room-emp-search-btn" onClick={searchEmp}>
              Tìm kiếm
            </button>
          </div>
        </div>
        <div className="medicine-container">
          <table className="medicine-table ">
            <thead>
              <tr>
                <th className="calendar-name">Tên nhân viên</th>
                <th>Ca làm việc</th>
                <th>Trạng thái</th>
                <th className="calendar-edit">Chỉnh sửa</th>
              </tr>
            </thead>
            <tbody>
              {filterEmployees?.map((emp) => (
                <tr key={emp.employeeName}>
                  <td>{emp.employeeName}</td>
                  <td>{getShiftNow()}</td>
                  <td>{emp.employeeStatus}</td>
                  <td>
                    <button className="medicine-edit-btn" onClick={() => editCalendar(emp)}>
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