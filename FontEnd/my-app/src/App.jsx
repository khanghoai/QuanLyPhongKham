import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Login from'./Login/Login'
import QuanLyNhanVien from './QuanLyNhanVien/QuanLyNhanVien'
import './App.css'
import ThemNhanVien from './ThemNhanVien/ThemNhanVien'
import QuanLyLichHen from './QuanLyLichHen/QuanLyLichHen'
import { BrowserRouter , Routes, Route } from "react-router-dom";
import ThemThuoc from './ThemThuoc/ThemThuoc'
import ThemBenhNhan from './ThemBenhNhan/ThemBenhNhan'
import BenhAn from './BenhAn/BenhAn'
import UpdateEmployee from './UpdateEmployee/UpdateEmployee'
import CreateAccount from './CreateAccount/CreateAccount'
import QuanLyThuoc from './QuanLyThuoc/QuanLyThuoc'

function App() {
  return (
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
    </Routes>
  )
}

export default App
