import { Route, Routes, useLocation } from "react-router-dom"
import AdminPage from './AdminPage/AdminPage'
import './App.css'
import BenhAn from './BenhAn/BenhAn'
import CreateAccount from './CreateAccount/CreateAccount'
import Employee from './Employee/Employee'
import EmployeeDetail from './EmployeeDetail/EmployeeDetail'
import Login from './Login/Login'
import QuanLyLichHen from './QuanLyLichHen/QuanLyLichHen'
import QuanLyPhongKham from './QuanLyPhongKham/QuanLyPhongKham'
import QuanLyThuoc from './QuanLyThuoc/QuanLyThuoc'
import ThanhToan from './ThanhToan/ThanhToan'
import ThemBenhNhan from './ThemBenhNhan/ThemBenhNhan'
import ThemThuoc from './ThemThuoc/ThemThuoc'
import UpdateEmployee from './UpdateEmployee/UpdateEmployee'
import UpdateMedicine from './UpdateMedicine/UpdateMedicine'

function App() {
  const location = useLocation();

  const allowedHeaderQuanLy = ["/quanLyNhanVien","/QuanLyPhongKham"]
  return (
    <>
      {allowedHeaderQuanLy.includes(location.pathname) && (
        <header className="quan-ly-header">
          <a href="/quanLyNhanVien">Nhân Viên</a>
          <a href="/QuanLyPhongKham">Phòng khám</a>
        </header>
      )}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Employee" element={<Employee />} />
        <Route path="/EmployeeDetail" element={<EmployeeDetail />} />
        <Route path="/QuanLyLichHen" element={<QuanLyLichHen />} />
        <Route path="/ThemThuoc" element={<ThemThuoc />} />
        <Route path="/ThemBenhNhan" element={<ThemBenhNhan />} />
        <Route path="/BenhAn" element={<BenhAn />} />
        <Route path="/UpdateEmployee" element={<UpdateEmployee />} />
        <Route path="/CreateAccount" element={<CreateAccount />} />
        <Route path='/QuanLyThuoc' element={<QuanLyThuoc />} />
        <Route path='/ThanhToan' element={<ThanhToan />} />
        <Route path='/UpdateMedicine' element={<UpdateMedicine/>} />
        <Route path='/QuanLyPhongKham' element={<QuanLyPhongKham/>} />
        <Route path='/AdminPage' element={<AdminPage/>} />
      </Routes>
    </>
    
  )
}

export default App
