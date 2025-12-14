import React, { useEffect, useState } from "react";
import "./Bill.css";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { postData } from "../api/apiMethod";
import { GET_BILL_DETAILS } from "../api/api";

export default function Bill(){
    const [hoaDon, setHoaDon] = useState();
    const navigate = useNavigate();
    const [searchText, setSearchText] = useState("");
    const location = useLocation();

    const payHandle = async () =>{
        const res = await postData("http://localhost:8080/api/hoaDon/xuatVien",hoaDon.benhNhan)
        navigate("/QuanLyLichHen")
    }

    const handleSearch = async () => {
        if(searchText != ""){
            const res = await postData(GET_BILL_DETAILS,searchText)
            console.log(res);
            setHoaDon(res);
        }
    };

    return (
        <div className="hoa-don-container">
            <div className="hoa-don-table-container">
                <h3 className="hoa-don-title">Hóa đơn</h3>
                <input
                    className="emp-search-input"
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
                <button className="emp-search-btn" onClick={handleSearch}>
                Tìm kiếm
                </button>
                <table>
                    <thead>
                        <tr>
                            <th>Tên thuốc</th>
                            <th>Số lượng</th>
                            <th>Tổng</th>
                        </tr>
                    </thead>
                    <tbody className="chiTietHoaDon">
                        {hoaDon?.map((p, index) => (
                            <tr key={index}>
                                <td>{p.medicine.medicineName}</td>
                                <td>{p.quantity}</td>
                                <td>{p.price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="bill-summary">
                <h4>Tổng tiền</h4>
                <div className="bill-total">{hoaDon[0]?.bill?.fullPrice}</div>
                <button className="pay-btn" onClick={payHandle}>
                    Thanh toán
                </button>
            </div>
        </div>
    );
}