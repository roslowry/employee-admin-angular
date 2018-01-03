const express = require('express');
const router = express.Router();
const Employee = require('../db/employee')


router.get('/', function(req, res, next){
  console.log('seeking employees')
  Employee.findAll({
    order: [['createdAt', 'DESC']]
  })
  .then(foundEmployees => {
    res.json(foundEmployees)
  })
  .catch(next)
});

router.get('/:id', function(req, res, next){
  Employee.findById(+req.params.id)
  .then(foundEmployee => {
    res.json(foundEmployee)
  })
  .catch(next)
})

router.get(`/search/:lastName`, function (req, res, next) {
  // console.log('in the employee router looking at req params for last name', req.params)
  Employee.findAll({
    where: {
      lastName: req.params.lastName
    }
  })
  .then(foundEmployees => {
    res.json(foundEmployees)
  })
  .catch(next)
})

router.post('/new-employee', function(req, res, next){
  Employee.create(req.body)
  .then(() => {
    return Employee.findAll({
      order: [['createdAt', 'DESC']]
    })
  })
  .then(foundEmployees => {
    res.status(201).json(foundEmployees)
  })
  .catch(next)
})

router.put('/update-employee/:id', function(req, res, next){
  Employee.findById(+req.params.id)
  .then(foundEmployee => {
    return foundEmployee.update(req.body)
  })
  .then(updatedEmployee => {
    res.json(updatedEmployee)
  })
  .catch(next)
})

router.delete('/delete-employee/:id', function(req, res, next) {
  Employee.findById(+req.params.id)
  .then(foundEmployee => {
    return foundEmployee.destroy()
  })
  .then(()=> {
    return Employee.findAll({
      order: [['createdAt', 'DESC']]
    })
  })
  .then(foundEmployees => {
    res.json(foundEmployees)
  })
  .catch(next)
})

module.exports = router
