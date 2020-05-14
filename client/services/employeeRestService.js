(function(){
  "use strict";

  employeeAdminApp.service('EmployeeRestService', function($http, AppUtilsService) {

    return {
      getAllEmployees: getAllEmployees,
      deleteEmployee: deleteEmployee,
      updateEmployee: updateEmployee,
      createEmployee: createEmployee,
      searchEmployeesByLastName: searchEmployeesByLastName
    }

    function searchEmployeesByLastName(lastName){

      if (!lastName) {
        return getAllEmployees();
      } else {
        return $http.get('/api/employees/search/' + lastName)
        .then(function(response){
          return response.data;
        }).then(function(employees){
          return employees.map(function(employee){
            return convertEmployee(employee);
          })
        })
      }
    }

    function getAllEmployees(){
      return $http.get('/api/employees')
      .then(function(response){
        return response.data;
      }).then(function(employees){
        return employees.map(function(employee){
          return convertEmployee(employee);
        })
      })
    }

    function deleteEmployee (employeeId, employee) {
      return $http.delete('/api/employees/delete-employee/' + employeeId.toString())
    }


    function updateEmployee (employee) {
      var updateRoute = '/api/employees/update-employee/' + employee.id.toString();
      return $http.put(updateRoute, employee)
    }

    function createEmployee(employee){

      return $http.post('/api/employees/new-employee/', employee);
    }


  /*Utility Methods*/
  
  // Update domain object to what the UI is expecting
  function convertEmployee(employee){
     var dateArr = employee.dateHired.split('-');
    employee.displayAddress = employee.address1 + ', ' + employee.address2 + "\n" + employee.city + ', ' + employee.state + ', ' + employee.zipcode 
    employee.displayActiveStatus = AppUtilsService.boolToString(employee.active);
    employee.displayHireDate = dateArr[1] + '-' + dateArr[2].slice(0,2) + '-' + dateArr[0];
    return employee
    // var dateMonth = dateArr[1];
    // var dateYear = dateArr[0];
    // var date = dateArr[2].slice(0, 2);
    // var convertedDate = dateMonth + '-' + date + '-' + dateYear;
    
  }


  });



})(window.angular);






// (function(){
//   'use strict'
  
//   employeeAdminApp.service('employeeRestService', function($http){
    
//     // var employeeService = $resource('/api/:request');
    
//     return {
//       getAllEmployees: getAllEmployees,
//       addEmployee: addEmployee,
//       updateEmployee: updateEmployee,
//       deleteEmployee: deleteEmployee,
//       searchLastName: searchLastName
//     }
  
//     function getAllEmployees(){
//       return $http.get('/api/employees')
//     }
    
//     function addEmployee () {
//       return $http.post('/api/employees/new-employee', employee)
//     }
    
//     function updateEmployee (employeeId, employee) {
//       var updateRoute = '/api/employees/update-employee/' + employeeId.toString();
//       return $http.put(updateRoute, employee)
//     }
  
//     function deleteEmployee (employeeId, employee) {
//       var updateRoute = '/api/employees/update-employee/' + employeeId.toString();
//       return $http.put(updateRoute, employee)
//     }
    
//     function searchLastName(lastName) {
//       var lastNameRoute = '/api/employees/search/' + lastName;
//       return $http.get(lastNameRoute)
//     }

//   })
  
//   // $scope.loadAll = function(){
//   //   return EmployeeFactory.getAllEmployees()
//   //   .then(function(response){
//   //     console.log('the employees are', response)
//   //     angular.copy(response.data, $scope.employeesPlain);
//   //     var editedEmployees =
//   //     $scope.convertEmployees(response.data)
//   //     angular.copy(editedEmployees, $scope.employees)
//   //   })
//   // }
//   // 
//   // $scope.searchLastName = function() {
//   //   return EmployeeFactory.searchLastName($scope.empLastName.lastName)
//   //   .then(function(response){
//   //     angular.copy(response.data, $scope.employeesPlain);
//   //     var editedEmployees =
//   //     $scope.convertEmployees(response.data)
//   //     angular.copy(editedEmployees, $scope.employees)
//   //     $scope.empLastName = {};
//   //   })
//   // }
//   // 
//   // $scope.loadAll();
//   // 
//   // $rootScope.$on('set_employee', function(evt, opt){
//   //   opt.dateHired = utils.convertDate(opt.dateHired);
//   //   $scope.updateEmp = opt;
//   // })
//   // 
//   // $rootScope.$on('delete_employee', function(evt, opt){
//   //   return EmployeeFactory.deleteEmployee(opt)
//   //   .then(function(response){
//   // 
//   //     angular.copy(response.data, $scope.employeesPlain);
//   //     var editedEmployees =
//   //     $scope.convertEmployees(response.data)
//   //     angular.copy(editedEmployees, $scope.employees)
//   //   })
//   // })
//   // 
//   // $rootScope.$on('load_all_employees', function(evt, opt){
//   //   $scope.loadAll();
//   // })
//   // 
//   // $scope.addEmployee = function() {
//   //   $scope.newEmp.phoneNumber = utils.convertPhone($scope.newEmp.phoneNumber);
//   //   return EmployeeFactory.addEmployee($scope.newEmp)
//   //   .then(function(result){
//   //     return $scope.loadAll()
//   //     .then(function(){
//   //       $scope.newEmp = {};
//   //       $rootScope.$broadcast('clear_tabs');
//   //     });
//   //   });
//   // };
//   // 
//   // $scope.updateEmployee = function(id){
//   //   $scope.updateEmp.phoneNumber = utils.convertPhone($scope.updateEmp.phoneNumber);
//   //   return EmployeeFactory.updateEmployee(id, $scope.updateEmp)
//   //   .then(function(result){
//   //     return $scope.loadAll()
//   //     .then(function(){
//   //       $scope.updateEmp = {};
//   //       $rootScope.$broadcast('clear_tabs');
//   //     });
//   //   });
//   // };
  
// })(window.angular)