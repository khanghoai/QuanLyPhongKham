import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GET_EMPLOYEES, GET_MEDICINES } from "../api/api";
import { getData } from "../api/apiMethod";
import "./Medicine.css";

export default function Medicine() {
  const [employees, setEmployees] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const [filterEmp, setfilterEmp] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const {position} = location.state || {};


  useEffect(() => {
    if(position != "Nhà thuốc"){
      navigate("/");
    }
    else{
      const fun = async () =>{
        const res = await getData(GET_MEDICINES);
        console.log(res);
        setMedicines(res);
      }
    fun();
    }
  }, []);

  const add = () => {
    navigate("/MedicineDetail", {
      state : {
        position : 'Nhà thuốc',
        med : null,
        fun : 'add'
        //fun chỉ có thể là add hoặc update. Nếu fun là update thì emp phải có giá trị
      }
    });
  };
  

  const edit = (med) => {
    navigate("/MedicineDetail", {
      state : {
        position : 'Nhà thuốc',
        med : med,
        fun : 'update'
        //fun chỉ có thể là add hoặc update. Nếu fun là update thì emp phải có giá trị
      }
    })
  }

  return (
    <div className="employee-container">
      <div className="employee-header">
        <button className="add-employee-btn" onClick={add}>
          Thêm thuốc
        </button>
      </div>
      <div className="employee-container">
        <table className="employee-table">
          <thead>
            <tr>
              <th>Tên thuốc</th>
              <th>Nơi nhập</th>
              <th>Giá nhập</th>
              <th>Giá bán</th>
              <th>Số lượng</th>
              <th>Cập nhật</th>
            </tr>
          </thead>
          <tbody>
            {medicines.map((med) => (
              <tr key={med.medicineName}>
                <td>{med.medicineName}</td>
                <td>{med.location}</td>
                <td>{med.importPrice}</td>
                <td>{med.sellingPrice}</td>
                <td>{med.quantity}</td>
                <td>
                  <button className="employee-edit-btn" onClick={() => edit(emp)}>
                    Chỉnh sửa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}