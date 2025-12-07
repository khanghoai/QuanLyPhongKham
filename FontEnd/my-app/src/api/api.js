const LINK = "http://localhost:8080/api"

const ACCOUNT = LINK + "/Account"

export const LOGIN = ACCOUNT + "/login"
export const ADD_EMPLOYEE = ACCOUNT + "/addEmployee"
export const GET_EMPLOYEES = ACCOUNT + "/getEmployees"
export const UPDATE_EMPLOYEE = ACCOUNT + "/updateEmployee"
export const SET_EMPLOYEE_QUIT = ACCOUNT + "/setEmployeeQuit"
export const GET_ALL_PHONG_KHAM = ACCOUNT + "/getAllPhongKham"
export const THEM_PHONG_KHAM = ACCOUNT + "/themPhongKham"
export const CREATE_ACCOUNT = ACCOUNT + "/createAccount"

const ROOM = LINK + "/Room"

export const ADD_ROOM = ROOM + "/addRoom"
export const GET_ROOMS = ROOM + "/getRooms"
export const ADD_CALENDARS = ROOM + "/addCalendars"
export const GET_CALENDAR_BY_ROOM = ROOM + "/getCalendarByRoom"
export const GET_CALENDAR_BY_EMPLOYEE = ROOM + "/getCalendarByEmployee"