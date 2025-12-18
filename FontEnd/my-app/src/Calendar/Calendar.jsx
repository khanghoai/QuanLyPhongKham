import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { ADD_CALENDARS, ADD_EMPLOYEE, GET_CALENDAR_BY_EMPLOYEE, GET_ROOMS, SET_EMPLOYEE_QUIT, UPDATE_EMPLOYEE } from "../api/api";
import { getData, postData } from "../api/apiMethod";
import './Calendar.css';

export default function Calendar() {
  const navigate = useNavigate();
  const location = useLocation();
  const {position, emp, fun} = location.state || {};
  const [calendar, setCalendar] = useState();
  const [rooms, setRooms] = useState([]);
  const [isSubmitform , setIsSubmitForm] = useState(false);
  const [selectedDay , setSelectedDay] = useState([]);
  const [shift, setShift] = useState(["---","---","---","---","---","---","---"]);
  const [roomChose, setRoomChose] = useState({roomName : ""});

  const WEEK = [
    { key: "mon", label: "Thứ Hai" },
    { key: "tue", label: "Thứ Ba" },
    { key: "wed", label: "Thứ Tư" },
    { key: "thu", label: "Thứ Năm" },
    { key: "fri", label: "Thứ Sáu" },
    { key: "sat", label: "Thứ Bảy" },
    { key: "sun", label: "Chủ Nhật" },
  ];

  useEffect(() => {
    if(position != 'Nhân sự'){
      navigate("/");
    }
    else{
      if(fun == "update"){
        getCalendar();
      }
      else{
        getRooms();
      }
    }
  },[])

  const getRooms = async () =>{
    const res = await getData(GET_ROOMS)
    setRooms(res);
    setRoomChose(res[0]);
  }

  const getCalendar = async () => {
    setCalendar(await postData(GET_CALENDAR_BY_EMPLOYEE,emp));
  }

  const addDay = (dayKey,i) => {
    if(selectedDay.includes(dayKey)){
      setSelectedDay(selectedDay.filter((d) => d != dayKey))
      unChoseShift(i);
    }
    else{
      setSelectedDay([...selectedDay,dayKey])
      choseAllShift(i);
    }
  }

  const unChoseShift = (i) => {
    let newShift = [...shift];
    newShift[i] = "---"
    setShift(newShift);
  }

  const choseAllShift = (i) => {
    let newShift = [...shift];
    newShift[i] = "012"
    setShift(newShift)
  }

  const choseShift = (i, s, day) => {
    let newShift = [...shift];
    if(newShift[i].charAt(s) == "-"){
      newShift[i] = newShift[i].substring(0,s) + s + newShift[i].substring(s+1);
    }
    else{
      newShift[i] = newShift[i].substring(0,s) + '-' + newShift[i].substring(s+1);
      if(newShift[i] == "---"){
        addDay(day,i);
      }
    }
    setShift(newShift);
  }

  const update = async (e) => {
    e.preventDefault();
    setIsSubmitForm(true);
    const res = await postData(UPDATE_EMPLOYEE,employee);
  };

  const exit = (e) => {
    e.preventDefault();
    navigate("/Room",{
      state : {
        position : 'Nhân sự',
      }
    })
  }

  const handleChange = (e) => {
    const roomSelect = rooms.find(room => room.roomName == e.target.value)
    setRoomChose(roomSelect);
  };

  const addCalendar = async (e) => {
    e.preventDefault();
    const body = []
    emp.room = roomChose;
    shift.forEach((s,i) => {
      if(s != "---"){
        const day = {
          shift: s,
          day : WEEK[i].key,
          employee : emp,
        }
        body.push(day)
      }
    });
    console.log(body)
    await postData(ADD_CALENDARS,body);
  }

  return (
    <div className="calendar-container">
      <div className="exit-container">
        <button onClick={exit} className="exit-btn">X</button>
      </div>
      <form className="calendar-form">
        <h3 className="calendar-title">Thời khóa biểu của nhân viên</h3>
        <div className="calendar-form-group">
          <label className="calendar-lable">Tên Nhân Viên</label>
          <input
            className="calendar-input"
            type="text"
            name="employeeName"
            value={emp.employeeName}
            disabled
          />
        </div>
        <div className="calendar-form-group">
          <label className="calendar-lable">Phòng</label>
          <select
            className="calendar-input"
            name="employeePosition"
            value={roomChose.roomName}
            onChange={handleChange}>
            {rooms.map(room => (
              <option value={room.roomName}>{room.roomName}</option>
            ))}
          </select>
        </div>
        <div>
          {WEEK.map((day,i) => {
            return(
              <div className="calendar-week-container">
                <label className="calendar-week-label" key={day.key}>
                  <input 
                    type="checkbox"
                    checked={selectedDay.includes(day.key)}
                    onChange={() => addDay(day.key,i)}             
                  />
                  {day.label}
                </label>
                <div className="calendar-shift-container">
                  <label className="calendar-shift-lable">
                    <input 
                      type="checkbox"
                      checked={shift[i].charAt(0) != '-'}
                      onChange={() => choseShift(i,0,day.key)}
                      disabled={!selectedDay.includes(day.key)}
                    />
                    Sáng
                  </label>
                  <label className="calendar-shift-lable">
                    <input 
                      type="checkbox"
                      checked={shift[i].charAt(1) != '-'}
                      onChange={() => choseShift(i,1,day.key)}
                      disabled={!selectedDay.includes(day.key)}
                    />
                    Chiều
                  </label>
                  <label className="calendar-shift-lable">
                    <input 
                      type="checkbox"
                      checked={shift[i].charAt(2) != '-'}
                      onChange={() => choseShift(i,2,day.key)}
                      disabled={!selectedDay.includes(day.key)}
                    />
                    Tối
                  </label>
                </div>
              </div>
              
            )
          })}
        </div>
        {fun == "add" &&
        <div className="calendar-button-group">
          <button type="submit" className="calendar-button" onClick={addCalendar}>
            Thêm
          </button>
        </div>
        }
        {fun == "update" &&
        <div className="calendar-button-group">
          <button type="submit" className="calendar-button" onClick={update}>
            Cập nhật
          </button>
        </div>
        }
      </form>
      {isSubmitform == true && 
      <div className="emp-detail-notify-container">
        <div className="emp-detail-notify">
          {fun == 'add' && <p>Thêm thành công</p> }
          {fun == 'update' && <p>Cập nhật thành công</p> }
          <button onClick={exit} className="emp-detail-button">Thoát</button>
        </div>
      </div>
      }
    </div>
  );
}
