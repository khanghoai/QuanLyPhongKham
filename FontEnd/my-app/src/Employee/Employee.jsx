import React, { useState, useEffect } from "react";
import "./Employee.css";
import { useLocation, useNavigate } from "react-router-dom";
import { getData, postData } from "../api/apiMethod";
import { GET_EMPLOYEES } from "../api/api";

export default function Employee() {
  const [employees, setEmployees] = useState([]);
  const [filterEmp, setfilterEmp] = useState([]);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const {position} = location.state || {};


  useEffect(() => {
    if(position != "nhanSu"){
      navigate("/");
    }
    else{
      const fun = async () =>{
        const res = await getData(GET_EMPLOYEES);
        setEmployees(res);
        setfilterEmp(res);
      }
    fun();
    }
  }, []);

  const getPosition = (position) => {
    switch(position){
      case 'nhanSu':
        return 'Nhân Sự'
      case 'bacSi' :
        return 'Bác Sĩ'
    }
  }

  const handleSearch = () => {
    if(searchText == ""){
      setfilterEmp(employees);
    }
    else{
      const filtered = employees.filter( p =>
        p.employeeCCCD == searchText
      );
      setfilterEmp(filtered);
    }
  };

  const add = () => {
    navigate("/EmployeeDetail", {
      state : {
        position : 'nhanSu',
        emp : null,
        fun : 'add'
        //fun chỉ có thể là add hoặc update. Nếu fun là update thì emp phải có giá trị
      }
    });
  };
  

  const edit = (employee) => {
    navigate("/EmployeeDetail", {
      state : {
        position : 'nhanSu',
        emp : employee,
        fun : 'update'
        //fun chỉ có thể là add hoặc update. Nếu fun là update thì emp phải có giá trị
      }
    })
  }

  return (
    <div className="employee-container">
      <div className="employee-header">
        <h2 className="employee-title">Danh Sách Nhân Viên</h2>
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
        <button className="add-employee-btn" onClick={add}>
          Thêm nhân viên
        </button>
      </div>
      <div className="employee-container">
        <table className="employee-table">
          <thead>
            <tr>
              <th>Tên Nhân Viên</th>
              <th>Chức vụ</th>
              <th>SDT</th>
              <th>CCCD</th>
              <th>Cập nhật</th>
            </tr>
          </thead>
          <tbody>
            {filterEmp.map((emp) => (
              <tr key={emp.employeeID}>
                <td>{emp.employeeName}</td>
                <td>{getPosition(emp.employeePosition)}</td>
                <td>{emp.employeePhone}</td>
                <td>{emp.employeeCCCD}</td>
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