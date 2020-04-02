
// angular.directive()
(function(){
  'use strict';
  
  employeeAdminApp.directive('employee', function(){
    return {
      restrict: 'E',
      templateUrl: 'employee/employee.tpl.html',
      controller: EmployeeController
    }
  });
  
  EmployeeController.$inject = ['$scope', '$rootScope', 'employeeRestService'];
  
  function EmployeeController($scope, $rootScope, employeeRestService){
      
    $scope.employees = [];
    

    // $scope.employeesPlain = [];
    // $scope.newEmp = {};
    // $scope.empLastName = {};
    // $scope.updateEmp = {};
    // $scope.states = utils.states;
    // $scope.bools = [true, false];

    // Initialize employee state
    employeeRestService.getAllEmployees()
    .then(function(response){
      var employees = response.data;
      $scope.employees = convertEmployees(employees);      
    });
    
    
    $scope.currentTab = 0;
    
    $scope.updateEmployee = function(employee){
      
      // $uibModel.open()
      
      $scope.updateEmp.phoneNumber = utils.convertPhone($scope.updateEmp.phoneNumber);
      return EmployeeFactory.updateEmployee(id, $scope.updateEmp)
      .then(function(result){
        return $scope.loadAll()
        .then(function(){
          $scope.updateEmp = {};
          $rootScope.$broadcast('clear_tabs');
        });
      });
    };    
    
    // Utility Functions
    function convertEmployees(employees){
      return employees.map(function(employee){
        return utils.convertEmployee(employee);
      });
    }
    
    
    
    
    
    
    // $scope.convertEmployees = function(employees) {
    //   return employees.map(function(employee){
    //     return utils.convertEmployee(employee)
    //   })
    // }
    

          // $scope.loadAll = function(){
          //   return EmployeeFactory.getAllEmployees()
          //   .then(function(response){
          //     console.log('the employees are', response)
          //     angular.copy(response.data, $scope.employeesPlain);
          //     var editedEmployees =
          //     $scope.convertEmployees(response.data)
          //     angular.copy(editedEmployees, $scope.employees)
          //   })
          // }
          // 
          // $scope.searchLastName = function() {
          //   return EmployeeFactory.searchLastName($scope.empLastName.lastName)
          //   .then(function(response){
          //     angular.copy(response.data, $scope.employeesPlain);
          //     var editedEmployees =
          //     $scope.convertEmployees(response.data)
          //     angular.copy(editedEmployees, $scope.employees)
          //     $scope.empLastName = {};
          //   })
          // }
          // 
          // $scope.loadAll();
          // 
          // $rootScope.$on('set_employee', function(evt, opt){
          //   opt.dateHired = utils.convertDate(opt.dateHired);
          //   $scope.updateEmp = opt;
          // })
          // 
          // $rootScope.$on('delete_employee', function(evt, opt){
          //   return EmployeeFactory.deleteEmployee(opt)
          //   .then(function(response){
          // 
          //     angular.copy(response.data, $scope.employeesPlain);
          //     var editedEmployees =
          //     $scope.convertEmployees(response.data)
          //     angular.copy(editedEmployees, $scope.employees)
          //   })
          // })
          // 
          // $rootScope.$on('load_all_employees', function(evt, opt){
          //   $scope.loadAll();
          // })
          // 
          // $scope.addEmployee = function() {
          //   $scope.newEmp.phoneNumber = utils.convertPhone($scope.newEmp.phoneNumber);
          //   return EmployeeFactory.addEmployee($scope.newEmp)
          //   .then(function(result){
          //     return $scope.loadAll()
          //     .then(function(){
          //       $scope.newEmp = {};
          //       $rootScope.$broadcast('clear_tabs');
          //     });
          //   });
          // };
          // 
          // $scope.updateEmployee = function(id){
          //   $scope.updateEmp.phoneNumber = utils.convertPhone($scope.updateEmp.phoneNumber);
          //   return EmployeeFactory.updateEmployee(id, $scope.updateEmp)
          //   .then(function(result){
          //     return $scope.loadAll()
          //     .then(function(){
          //       $scope.updateEmp = {};
          //       $rootScope.$broadcast('clear_tabs');
          //     });
          //   });
          // };

    // $scope.close = function(){
    //   $rootScope.$broadcast('clear_tabs')
    // }
  };

  
})(window.angular)