import React, { useEffect, useState } from "react";
import "./ThanhToan.css";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { postData } from "../api/api";

export default function ThanhToan(){
    const [hoaDon, setHoaDon] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const getThanhToan = async () =>{
            const res = await postData("http://localhost:8080/api/hoaDon/thanhToan",location.state)
            setHoaDon(res);
        }
        getThanhToan();
    }, []);

    const handleAddAppointment = async () => {
        const res = await postData("http://localhost:8080/api/hoaDon/xuatVien",hoaDon.benhNhan)
        navigate("/QuanLyBenhNhan");
    };

    const handleAction = (action,benhAn) => {
        if(action == "Sua"){
            navigate("/BenhAn",{state : benhAn})
        }
    };

    return (
        // <div className="patient-container">
        //     <div className="table-container">
        //         <h3>Hóa đơn</h3>
        //         {/* <p>{hoaDon?.benhNhan.hoTenBN}</p> */}
        //         <table>
        //         <thead>
        //             <tr>
        //             <th>Tên thuốc</th>
        //             <th>Số lượng</th>
        //             <th>Tổng</th>
        //             </tr>
        //         </thead>
        //         <tbody>
        //             {hoaDon?.chiTietHoaDons?.map((p) => (
        //                 <tr key={p.maCTHD}>
        //                     <td>{p.thuoc.tenThuoc}</td>
        //                     <td>{p.soLuong}</td>
        //                     <td>{p.tien}</td>
        //                 </tr>
        //             ))}
        //         </tbody>
        //         </table>
        //         <p>Tổng tiền {hoaDon?.tongTien}</p>
        //         <button className="edit-btn" onClick={() => handleEdit(emp)}>
        //             Thanh toán
        //         </button>
        //     </div>
        // </div>
        <div className="patient-container">

        <div className="table-container">
            <h3>Hóa đơn</h3>

            <table>
                <thead>
                    <tr>
                        <th>Tên thuốc</th>
                        <th>Số lượng</th>
                        <th>Tổng</th>
                    </tr>
                </thead>
                <tbody className="chiTietHoaDon">
                    {hoaDon?.chiTietHoaDons?.map((p, index) => (
                        <tr key={index}>
                            <td>{p.thuoc.tenThuoc}</td>
                            <td>{p.soLuong}</td>
                            <td>{p.tien}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        <div className="bill-summary">
            <h4>Tổng tiền</h4>
            <div className="bill-total">{hoaDon?.tongTien}</div>

            <button className="pay-btn">
                Thanh toán
            </button>
        </div>

    </div>
    );
}