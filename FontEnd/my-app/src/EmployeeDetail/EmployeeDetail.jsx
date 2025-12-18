import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ADD_EMPLOYEE, SET_EMPLOYEE_QUIT, UPDATE_EMPLOYEE } from "../api/api";
import { postData } from "../api/apiMethod";
import './EmployeeDetail.css';

export default function EmployeeDetail() {
  const [employee, setEmployee] = useState({
    employeeName: "",
    employeePhone: "",
    employeeCCCD: "",
    employeeSex: "",
    employeeBirth: "",
    employeePosition: "Bác sĩ",
  });
  const navigate = useNavigate();
  const location = useLocation();
  const {position, emp, fun} = location.state || {};
  const [isSubmitform , setIsSubmitForm] = useState(false);
  const [isDelete , SetIsDelete] = useState(false);

  useEffect(() => {
    if(position != 'admin' && position != 'Nhân sự'){
      navigate("/");
    }
    if(fun == "update"){
      setEmployee(emp);
    }
  },[])

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitForm(true);
    const res = await postData(ADD_EMPLOYEE,employee);
    setEmployee(res);
  };

  const addCalendar = () => {
    navigate("/Calendar", {
      state : {
        position : "Nhân sự",
        emp : employee,
        fun : 'add'
      }
    })
  }

  const update = async (e) => {
    e.preventDefault();
    setIsSubmitForm(true);
    const res = await postData(UPDATE_EMPLOYEE,employee);
  };

  const deleteEmployee = (e) => {
    e.preventDefault();
    SetIsDelete(true);
  }

  const deleteCancel = (e) => {
    e.preventDefault();
    SetIsDelete(false);
  }

  const deleteComfirm = async (e) => {
    e.preventDefault();
    await postData(SET_EMPLOYEE_QUIT,employee);
    SetIsDelete(false);
    setIsSubmitForm(true);
  }

  const exit = (e) => {
    e.preventDefault();
    navigate("/Employee",{
      state : {
        position : 'Nhân sự',
      }
    })
  }

  return (
    <div className="add-emp-container">
      <div className="exit-container">
        <button onClick={exit} className="exit-btn">X</button>
      </div>
      <form className="add-emp-form" onSubmit={handleSubmit}>
        <h3 className="add-emp-title">Thêm nhân viên</h3>
        <div className="add-emp-form-group">
          <label className="add-emp-lable">Tên Nhân Viên</label>
          <input
            className="add-emp-input"
            type="text"
            name="employeeName"
            value={employee.employeeName}
            onChange={handleChange}
          />
        </div>
        <div className="add-emp-form-group">
          <label className="add-emp-lable">Số điện thoại</label>
          <input
            className="add-emp-input"
            type="number"
            name="employeePhone"
            value={employee.employeePhone}
            onChange={handleChange}
          />
        </div>
        <div className="add-emp-form-group">
          <label className="add-emp-lable">CCCD</label>
          <input
            className="add-emp-input"
            type="number"
            name="employeeCCCD"
            value={employee.employeeCCCD}
            onChange={handleChange}
          />
        </div>
        <div className="add-emp-form-group">
          <label className="add-emp-lable">Giới tính</label>
          <input
            className="add-emp-input"
            type="text"
            name="employeeSex"
            value={employee.employeeSex}
            onChange={handleChange}
          />
        </div>
        <div className="add-emp-form-group">
          <label className="add-emp-lable">Ngày sinh</label>
          <input
            className="add-emp-input"
            type="date"
            name="employeeBirth"
            value={employee.employeeBirth}
            onChange={handleChange}
          />
        </div>
        <div className="add-emp-form-group">
          <label className="add-emp-lable">Chức vụ</label>
          <select
            className="add-emp-input"
            name="employeePosition"
            value={employee.employeePosition}
            onChange={handleChange}>
            <option value="Bác sĩ">Bác sĩ</option>
            <option value="Lễ tân">Lễ Tân</option>
            <option value="Nhà thuốc">Nhà thuốc</option>
            <option value="Nhân sự">Nhân sự</option>
            <option value="Thu ngân">Thu ngân</option>
          </select>
        </div>
        {fun == "add" &&
        <div className="add-emp-button-group">
          <button type="submit" className="add-emp-button">
            Thêm
          </button>
        </div>
        }
        {fun == "update" &&
        <div className="add-emp-button-group">
          <button type="submit" className="add-emp-button" onClick={update}>
            Cập nhật
          </button>
          <button type="submit" className="add-emp-button" onClick={deleteEmployee}>
            Xóa
          </button>
        </div>
        }
      </form>
      {isSubmitform == true && 
      <div className="emp-detail-notify-container">
        <div className="emp-detail-notify">
          {fun == 'add' &&
          <>
            <p>Thêm thành công</p>
            <button onClick={addCalendar} className="emp-detail-button">Thoát</button>
          </>
          }
          {fun == 'update' &&
          <>
            <p>Cập nhật thành công</p>
            <button onClick={exit} className="emp-detail-button">Thoát</button>
          </>
          }
        </div>
      </div>
      }
      {isDelete == true &&
      <div className="emp-detail-notify-container">
        <div className="emp-detail-notify">
          <p>Xác nhận xóa nhân viên {employee.employeeName}</p>
          <p>Tài khoản của nhân viên cũng sẽ bị xóa</p>
          <div className="add-emp-button-group">
            <button className="add-emp-button" onClick={deleteComfirm}>Xác nhận</button>
            <button className="add-emp-button" onClick={deleteCancel}>Hủy</button>
          </div>
        </div>
      </div>
      }
    </div>
  );
}
