import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Login from'./Login/Login'
import QuanLyNhanVien from './QuanLyNhanVien/QuanLyNhanVien'
import './App.css'
import ThemNhanVien from './ThemNhanVien/ThemNhanVien'
import QuanLyLichHen from './QuanLyLichHen/QuanLyLichHen'
import { BrowserRouter , Routes, Route, useLocation } from "react-router-dom";
import ThemThuoc from './ThemThuoc/ThemThuoc'
import ThemBenhNhan from './ThemBenhNhan/ThemBenhNhan'
import BenhAn from './BenhAn/BenhAn'
import UpdateEmployee from './UpdateEmployee/UpdateEmployee'
import CreateAccount from './CreateAccount/CreateAccount'
import QuanLyThuoc from './QuanLyThuoc/QuanLyThuoc'
import ThanhToan from './ThanhToan/ThanhToan'
import UpdateMedicine from './UpdateMedicine/UpdateMedicine'
import QuanLyPhongKham from './QuanLyPhongKham/QuanLyPhongKham'

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
        <Route path="/quanLyNhanVien" element={<QuanLyNhanVien />} />
        <Route path="/QuanLyLichHen" element={<QuanLyLichHen />} />
        <Route path="/ThemNhanVien" element={<ThemNhanVien />} />
        <Route path="/ThemThuoc" element={<ThemThuoc />} />
        <Route path="/ThemBenhNhan" element={<ThemBenhNhan />} />
        <Route path="/BenhAn" element={<BenhAn />} />
        <Route path="/UpdateEmployee" element={<UpdateEmployee />} />
        <Route path="/CreateAccount" element={<CreateAccount />} />
        <Route path='/QuanLyThuoc' element={<QuanLyThuoc />} />
        <Route path='/ThanhToan' element={<ThanhToan />} />
        <Route path='/UpdateMedicine' element={<UpdateMedicine/>} />
        <Route path='/QuanLyPhongKham' element={<QuanLyPhongKham/>} />
      </Routes>
    </>
    
  )
}

export default App
