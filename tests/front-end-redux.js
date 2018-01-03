import React from 'react'
import chai, { expect } from 'chai';
import Enzyme, { configure, shallow, mount } from 'enzyme';
import {spy} from 'sinon';
import sinonChai from 'sinon-chai';
chai.use(sinonChai);
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import Adapter from 'enzyme-adapter-react-16';
import EmployeeInputForm from '../browser/components/EmployeeInputForm';
import 'jsdom-global/register';

// import  db  from '../server/db/'

import reducer, { setEmployees, setEmployeeToUpdate, setFormUpdatingStatus, clearFormUpdatingStatus, fetchSingleEmployee, fetchEmployees, updateEmployee, deleteEmployee, addEmployee, findEmployeesByLastName } from '../browser/reducers/root-reducer';
import { SET_EMPLOYEES, SET_EMPLOYEE_TO_UPDATE, SET_FORM_UPDATE_STATUS, CLEAR_FORM_UPDATE_STATUS } from '../browser/reducers/root-reducer'

Enzyme.configure({ adapter: new Adapter()})

import { createEmployee } from '../server/db/seed-files/seed-utils';
// import { generateFakeEmployees } from '../server/db/seed-files/seed';
function generateFakeEmployees(n) {
  let employees = [];
  while (n) {
    let newEmployee = createEmployee()
    employees.push(newEmployee)
    n -=1
  }
  return employees;
}
// db.sync()

describe('Redux architecture', () => {
  describe('action creators', () => {

    let multipleEmployees, singleEmployee;
    beforeEach('Create dummy employee info', () => {
      multipleEmployees = generateFakeEmployees(5);
      singleEmployee = createEmployee()
    })

    describe('setEmployeesAction', () => {
      it('returns expected action description',() => {
        const actionDescription = setEmployees(multipleEmployees);

        expect(actionDescription).to.be.deep.equal({
          type: SET_EMPLOYEES,
          employees: multipleEmployees
        })
      })

    })
    describe('setEmployeeToUpdateAction', () => {
      it('returns expected action description',() => {
        const actionDescription = setEmployeeToUpdate(singleEmployee);

        expect(actionDescription).to.be.deep.equal({
          type: SET_EMPLOYEE_TO_UPDATE,
          employee: singleEmployee
        })
      })
    })

    describe('setFormUpdatingStatus', () => {
      it('returns expected action description',() => {
        const actionDescription = setFormUpdatingStatus();

        expect(actionDescription).to.be.deep.equal({
          type: SET_FORM_UPDATE_STATUS,
        })
      })
    })
  });

  describe('reducer/store', () => {
    let testingStore;
    beforeEach('Create a store for running tests', () => {
      testingStore = createStore(reducer, applyMiddleware(thunkMiddleware))
    })
    let multipleEmployees = generateFakeEmployees(5);
    let singleEmployee = createEmployee();

    it('has empty initial state', () => {
      const currentStoreState = testingStore.getState();
      expect(currentStoreState.employees.length).to.be.equal(0);
      expect(Object.keys(currentStoreState.employeeToUpdate).length).to.be.equal(0)
      expect(currentStoreState.formUpdating).to.be.equal(false)
    });
    describe('reducer on fetch employees action', () => {
      it('places employees from the database on the list of employees', () => {
        testingStore.dispatch(setEmployees(multipleEmployees))
        const currentStoreState = testingStore.getState();
        expect(currentStoreState.employees.length).to.not.be.equal(0)
      })
    });
    describe('reducer on set single employee action', () => {
      it('places a single employee from the database on the store state', () => {
        testingStore.dispatch(setEmployeeToUpdate(singleEmployee))
        const currentStoreState = testingStore.getState();
        expect(Object.keys(currentStoreState.employeeToUpdate).length).to.not.be.equal(0)
      })

    })
})
})
