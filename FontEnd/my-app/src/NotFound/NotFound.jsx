import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ADD_EMPLOYEE, SET_EMPLOYEE_QUIT, UPDATE_EMPLOYEE } from "../api/api";
import { postData } from "../api/apiMethod";
import './NotFound.css';

export default function NotFound() {
  

  return (
    <div>
        <p>Not found</p>
    </div>
  );
}
