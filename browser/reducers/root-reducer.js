import axios from 'axios'

// constants
export const SET_EMPLOYEES = 'SET_EMPLOYEES';
export const SET_EMPLOYEE_TO_UPDATE = 'SET_EMPLOYEE_TO_UPDATE';
export const SET_FORM_UPDATE_STATUS = 'SET_FORM_UPDATE_STATUS'
export const CLEAR_FORM_UPDATE_STATUS = 'CLEAR_FORM_UPDATE_STATUS'

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
      console.log('the returned employees are', employees)
      dispatch(setEmployees(employees));
    })
  }

}

export function updateEmployee(id, body) {
  return dispatch => {
    axios.put(`/api/employees/update-employee/${id}`,body)
    .then(res => res.data)
    .then(updatedEmployee => {
      dispatch(fetchEmployees());
      dispatch(clearFormUpdatingStatus());
    })
  }
}

export function deleteEmployee(id){
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

export function findEmployeesByLastName(name) {

  console.log('here in find employees by last name')
  return dispatch => {
    axios.get(`/api/employees/search/${name}`)
    .then(res => res.data)
    .then(foundEmployees => {
      dispatch(setEmployees(foundEmployees))
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
