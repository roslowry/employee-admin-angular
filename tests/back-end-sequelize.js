
const Promise = require('bluebird');

import chai, { expect } from 'chai';
import {spy} from 'sinon';
import sinonChai from 'sinon-chai';
chai.use(sinonChai);
import { createStore, applyMiddleware } from 'redux';
// import turnOnDb from '../server/db/db'
import Adapter from 'enzyme-adapter-react-16';
import EmployeeInputForm from '../browser/components/EmployeeInputForm';
import 'jsdom-global/register';
const Employee = db.model('employee')
import db  from '../server/db/';
import { createEmployee } from '../server/db/seed-files/seed-utils'

db.sync()

describe('▒▒▒ Backend Sequelize tests ▒▒▒', () => {

  describe('Object-relational-mapper (Sequelize) models', () => {
    describe('Employee model', () => {

      it('has the expected schema definition', () => {
        expect(Employee.attributes.dateHired).to.be.an('object')
      })
    });

    describe('functionality', () => {
      let newEmployee, sampleEmployee;
      beforeEach('construct new employee profiles', () => {
        sampleEmployee = createEmployee();
        // sampleEmployee.phoneNumber = '817839689'
        return Employee.create(sampleEmployee)
        .then(returnedEmployee=> {
          newEmployee = returnedEmployee
        })
      })
      // afterEach('destrpy new instance', ()=> {
      //   return newEmployee.destroy();
      // })

      describe('getter methods', () => {
        it('returns the correct fullName', () => {
          expect(newEmployee.fullName).to.be.equal(sampleEmployee.firstName + ' ' + sampleEmployee.lastName)
        })
        // it('returns the correct phone number', () => {
        //   expect(newEmployee.fullName).to.be.equal(sampleEmployee.firstName + ' ' + sampleEmployee.lastName)
        // })
      })
    })
})
})
