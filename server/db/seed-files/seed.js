const Promise = require('bluebird');
const db = require('../');
const Employee = db.model('employee');
const {createFullName, generateEmail, generatePhoneNumber, generatePositionCategory, generateAddress, generateState, generateZipCode, generateActiveBool, generateCity, generateHireDate, createEmployee} = require('./seed-utils')

const amountOfUsers = 75;


function generateFakeEmployees(n) {
  let employees = [];
  while (n) {
    let newEmployee = createEmployee()
    employees.push(newEmployee)
    n -=1
  }
  return employees;
}

const newEmployees = generateFakeEmployees(amountOfUsers)

function createData() {
  db.sync({force: true})
  .then(function() {
    console.log('Dropped old data, now inserting new data!');
    return Promise.map(newEmployees, function(employee) {
      return Employee.create(employee)
    })
  })
  .catch(function(err){
    console.error('There was a problem: \n', err, err.stack)
  })
  .finally(function(){
    db.close();
    console.log('Update complete');
    return null;
  })
}

createData()
