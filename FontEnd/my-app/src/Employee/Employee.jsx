import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GET_EMPLOYEES } from "../api/api";
import { getData } from "../api/apiMethod";
import "./Employee.css";

export default function Employee() {
  const [employees, setEmployees] = useState([]);
  const [filterEmp, setfilterEmp] = useState([]);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const {position} = location.state || {};


  useEffect(() => {
    if(position != "Nhân sự"){
      navigate("/");
    }
    else{
      const fun = async () =>{
        const res = await getData(GET_EMPLOYEES);
        console.log(res);
        setEmployees(res);
        setfilterEmp(res);
      }
    fun();
    }
  }, []);

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
        position : 'Nhân sự',
        emp : null,
        fun : 'add'
        //fun chỉ có thể là add hoặc update. Nếu fun là update thì emp phải có giá trị
      }
    });
  };
  

  const edit = (employee) => {
    navigate("/EmployeeDetail", {
      state : {
        position : 'Nhân sự',
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
        <div>
            <input
              className="room-emp-search-input"
              type="text"
              placeholder="Nhập CCCD cần tìm..."
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
            />
            <button className="room-emp-search-btn" onClick={handleSearch}>
              Tìm kiếm
            </button>
          </div>
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
              <tr key={emp.employeeCCCD}>
                <td>{emp.employeeName}</td>
                <td>{emp.employeePosition}</td>
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