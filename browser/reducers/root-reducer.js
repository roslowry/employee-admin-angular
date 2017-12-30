import axios from 'axios'

// constants
const SET_EMPLOYEES = 'SET_EMPLOYEES';
const SET_EMPLOYEE_TO_UPDATE = 'SET_EMPLOYEE_TO_UPDATE';
const SET_FORM_UPDATE_STATUS = 'SET_FORM_UPDATE_STATUS'
const CLEAR_FORM_UPDATE_STATUS = 'CLEAR_FORM_UPDATE_STATUS'

// action creators

export function setEmployees(employees) {
  return {
    type: SET_EMPLOYEES,
    employees
  }
}

export function setEmployeeToUpdate(employee) {
  return {
    type: SET_EMPLOYEE_TO_UPDATE,
    employee
  }
}

export function setFormUpdatingStatus(){
  return {
    type: SET_FORM_UPDATE_STATUS,
  }
}

export function clearFormUpdatingStatus(){
  return {
    type: CLEAR_FORM_UPDATE_STATUS,
  }
}

// thunk action creators
export function fetchSingleEmployee(id) {
  console.log('inside fetch employee')
  return dispatch => {
    axios.get(`/api/employees/${id}`)
    .then(res => res.data)
    .then(employee => {
      dispatch(setEmployeeToUpdate(employee));
      dispatch(setFormUpdatingStatus())
    })
  }
}


export function fetchEmployees (employees) {
  return dispatch => {
    axios.get('/api/employees')
    .then(res => res.data)
    .then(employees => {
      dispatch(setEmployees(employees));
    })
  }

}

export function updateEmployee(id, body) {
  return dispatch => {
    axios.put(`/api/employees/update-employee/${id}`,body)
    .then(res => res.data)
    .then(updatedEmployee => {
      console.log('updated employee', updatedEmployee)
      dispatch(fetchEmployees());
      dispatch(clearFormUpdatingStatus());
    })
  }
}

export function deleteEmployee(id){
  console.log('inside delete employee')
  console.log('the employee id is', id)
  return dispatch => {
    axios.delete(`/api/employees/delete-employee/${id}`)
    .then(res => res.data)
    .then(employees => {
      dispatch(setEmployees(employees))

    })
  }
}

export function addEmployee(employee) {
  return dispatch => {
    axios.post('/api/employees/new-employee', employee)
    .then(res => res.data)
    .then(updatedEmployees => {
      dispatch(setEmployees(updatedEmployees))
    })
  }
}

const initialiState = {
  employees: [],
  employeeToUpdate: {},
  formUpdating: false
};

const reducer = function (state=initialiState, action) {
  const newState = Object.assign({}, state);
  switch (action.type) {
    case SET_EMPLOYEES:
      newState.employees = action.employees;
      break;
    case SET_EMPLOYEE_TO_UPDATE:
      newState.employeeToUpdate = action.employee;
      break;
    case SET_FORM_UPDATE_STATUS:
      newState.formUpdating = true;
      break;
    case CLEAR_FORM_UPDATE_STATUS:
      newState.formUpdating = false;
      break;
    // case: // X
    default:
      return state;
  }
  return newState;
}

export default reducer;
