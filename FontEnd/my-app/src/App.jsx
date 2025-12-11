import { Route, Routes, useLocation, useNavigate } from "react-router-dom"
import AdminPage from './AdminPage/AdminPage'
import './App.css'
import BenhAn from './BenhAn/BenhAn'
import Calendar from "./Calendar/Calendar"
import Employee from './Employee/Employee'
import EmployeeDetail from './EmployeeDetail/EmployeeDetail'
import Login from './Login/Login'
import NotFound from "./NotFound/NotFound"
import QuanLyLichHen from './QuanLyLichHen/QuanLyLichHen'
import QuanLyThuoc from './QuanLyThuoc/QuanLyThuoc'
import Room from "./Room/Room"
import ThanhToan from './ThanhToan/ThanhToan'
import ThemBenhNhan from './ThemBenhNhan/ThemBenhNhan'
import ThemThuoc from './ThemThuoc/ThemThuoc'
import UpdateMedicine from './UpdateMedicine/UpdateMedicine'
import Patient from "./Patient/Patient"
import Doctor from "./Doctor/Doctor"
import { postData } from "./api/apiMethod"
import { LOGOUT } from "./api/api"

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
        <Route path='*' element={<NotFound/>} />
        <Route path="/QuanLyLichHen" element={<QuanLyLichHen />} />
        <Route path="/ThemThuoc" element={<ThemThuoc />} />
        <Route path="/ThemBenhNhan" element={<ThemBenhNhan />} />
        <Route path="/BenhAn" element={<BenhAn />} />
        <Route path='/QuanLyThuoc' element={<QuanLyThuoc />} />
        <Route path='/ThanhToan' element={<ThanhToan />} />
        <Route path='/UpdateMedicine' element={<UpdateMedicine/>} />
      </Routes>
    </>
  )
}

export default App
