import React, { useEffect, useState } from "react";
import "./MedicineDetail.css";
import { postData } from "../api/apiMethod";
import { useLocation, useNavigate } from "react-router-dom";
import { ADD_MEDICINE } from "../api/api";

export default function MedicineDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const [medicine, setMedicine] = useState("");
  const {position, med, fun} = location.state || "";

  useEffect(() => {
    if(position != 'Nhà thuốc'){
      navigate("/");
    }
    if(fun == "update"){
      setMedicine(med);
    }
  },[])

  const handleChange = (e) => {
    e.preventDefault();
    setMedicine({ ...medicine, [e.target.name]: e.target.value });
  };

  const addMedicine = async (e) => {
    e.preventDefault();
    await postData(ADD_MEDICINE,medicine);
    navigate("/Medicine",{
      state : {
        position : "Nhà thuốc"
      }
    });
  };

  const deleteMedicine = async (e) => {
    e.preventDefault();
    const res = await postData("http://localhost:8080/api/Medicine/deleteMedicine",medicine);
    navigate("/Medicine");
  }

  const updateMedicine = async (e) => {
    e.preventDefault();
    const res = await postData("http://localhost:8080/api/Medicine/deleteMedicine",medicine);
    navigate("/Medicine");
  }

  return (
    <div className="up-medicine-container">
      <form className="up-medicine-form">
      <h2 className="up-medicine-title">Thêm thuốc</h2>
        <div className="up-medicine-form-group">
          <label className="up-medicine-lable">Tên thuốc</label>
          <input
            className="up-medicine-input"
            type="text"
            placeholder="Nhập tên thuốc"
            onChange={handleChange}
            name="medicineName"
            value={medicine.medicineName || ""} />
        </div>

        <div className="up-medicine-form-group">
          <label className="up-medicine-lable">Nhà cung cấp</label>
          <input
            className="up-medicine-input"
            type="text"
            placeholder="Nhập tên nhà cung cấp"
            onChange={handleChange}
            name="location"
            value={medicine.location || ""} />
        </div>

        <div className="up-medicine-form-group">
          <label className="up-medicine-lable">Giá Nhập</label>
          <input
            className="up-medicine-input"
            type="number"
            placeholder="Nhập giá nhập"
            onChange={handleChange}
            name="importPrice"
            value={medicine.importPrice || ""} />
        </div>

        <div className="up-medicine-form-group">
          <label className="up-medicine-lable">Giá Bán</label>
          <input
            className="up-medicine-input"
            type="number"
            placeholder="Nhập giá bán"
            onChange={handleChange}
            name="sellingPrice"
            value={medicine.sellingPrice || ""} />
        </div>

        <div className="up-medicine-form-group">
          <label className="up-medicine-lable">Số lượng</label>
          <input
            className="up-medicine-input"
            type="number"
            placeholder="Nhập số lượng"
            onChange={handleChange}
            name="quantity"
            value={medicine.quantity || ""}/>
        </div>
        {fun == 'add' &&
          <div className="up-medicine-button-group">
            <button type="button" className="up-medicine-button up-medicine-update" onClick={addMedicine}>Thêm</button>
          </div>
        }
        {fun == "update" &&
          <div className="up-medicine-button-group">
            <button type="button" className="up-medicine-button up-medicine-update" onClick={updateMedicine}>Cập nhập</button>
            <button className="up-medicine-button up-medicine-delete" onClick={deleteMedicine}>Xóa</button>
          </div>
        }
      </form>
    </div>
  );
}
