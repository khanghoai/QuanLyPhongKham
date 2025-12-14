import { Route, Routes, useLocation, useNavigate } from "react-router-dom"
import AdminPage from './AdminPage/AdminPage'
import { LOGOUT } from "./api/api"
import { postData } from "./api/apiMethod"
import './App.css'
import Bill from "./Bill/Bill"
import Calendar from "./Calendar/Calendar"
import Doctor from "./Doctor/Doctor"
import Employee from './Employee/Employee'
import EmployeeDetail from './EmployeeDetail/EmployeeDetail'
import Login from './Login/Login'
import Medicine from "./Medicine/Medicine"
import MedicineDetail from "./MedicineDetail/MedicineDetail"
import NotFound from "./NotFound/NotFound"
import Patient from "./Patient/Patient"
import Room from "./Room/Room"

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const {position, cccd} = location.state || {}

  const logOut = async () => {
    if(cccd != "1"){
      await postData(LOGOUT,cccd)
    }
    navigate("/");
  }

  const allowedHeaderQuanLy = ["/Employee","/Room"]
  const notAllowedHeader = ["/","/Calendar","/EmployeeDetail"]
  return (
    <>
      {(!notAllowedHeader.includes(location.pathname)) &&
        <header className="quan-ly-header">
          {allowedHeaderQuanLy.includes(location.pathname) &&
            <div className="nhanSu"> 
              <button onClick={() => {
                navigate("/Employee", {
                  state : {
                    position : 'nhanSu'
                  }
                })
              }}>Nhân viên</button>
              <button onClick={() => {
                navigate("/Room", {
                  state : {
                    position : 'nhanSu'
                  }
                })
              }}>Phòng</button>
            </div>
          }
          <div className="employee-log-out">
            <button className="employee-log-out-btn" onClick={logOut}>Đăng xuất</button>
          </div>
        </header>
      }
      
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path='/AdminPage' element={<AdminPage/>} />
        <Route path="/Employee" element={<Employee />} />
        <Route path="/EmployeeDetail" element={<EmployeeDetail />} />
        <Route path='/Room' element={<Room/>} />
        <Route path='/Calendar' element={<Calendar/>} />
        <Route path='/Patient' element={<Patient/>} />
        <Route path='/Doctor/:doctorID' element={<Doctor/>} />
        <Route path='/Medicine' element={<Medicine/>} />
        <Route path='/MedicineDetail' element={<MedicineDetail/>} />
        <Route path='/Bill' element={<Bill/>} />
        <Route path='*' element={<NotFound/>} />
      </Routes>
    </>
  )
}

export default App
