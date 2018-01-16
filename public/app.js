var app = angular.module('employeeTracker', []);

app.factory('EmployeeFactory', function($http){

  var employeesPlain = [];
  var employees = [];
  return {
    getAllEmployees: function(){
      return $http.get('/api/employees')
    },
    addEmployee: function(employee) {
      return $http.post('/api/employees/new-employee', employee)
    },
    updateEmployee: function(employeeId, employee) {
      var updateRoute = '/api/employees/update-employee/' + employeeId.toString();
      return $http.put(updateRoute, employee)
    },
    deleteEmployee: function(id){
      var deleteRoute = '/api/employees/delete-employee/' + id.toString();
      return $http.delete(deleteRoute)
    },
    searchLastName: function(lastName) {
      var lastNameRoute = '/api/employees/search/' + lastName;
      return $http.get(lastNameRoute)
    }
  };

})


app.controller('EmployeeController', function($scope, $rootScope, EmployeeFactory){
  $scope.employees = [];
  $scope.employeesPlain = [];
  $scope.newEmp = {};
  $scope.empLastName = {};
  $scope.updateEmp = {};
  $scope.states = utils.states;
  $scope.bools = [true, false];
  $scope.convertEmployees = function(employees) {
    return employees.map(function(employee){
      return utils.convertEmployee(employee)
    })
  }

  $scope.loadAll = function(){
    return EmployeeFactory.getAllEmployees()
    .then(function(response){
      angular.copy(response.data, $scope.employeesPlain);
      var editedEmployees =
      $scope.convertEmployees(response.data)
      angular.copy(editedEmployees, $scope.employees)
    })
  }

  $scope.searchLastName = function() {
    return EmployeeFactory.searchLastName($scope.empLastName.lastName)
    .then(function(response){
      angular.copy(response.data, $scope.employeesPlain);
      var editedEmployees =
      $scope.convertEmployees(response.data)
      angular.copy(editedEmployees, $scope.employees)
      $scope.empLastName = {};
    })
  }

  $scope.loadAll();

  $rootScope.$on('set_employee', function(evt, opt){
    opt.dateHired = utils.convertDate(opt.dateHired);
    $scope.updateEmp = opt;
  })

  $rootScope.$on('delete_employee', function(evt, opt){
    return EmployeeFactory.deleteEmployee(opt)
    .then(function(response){

      angular.copy(response.data, $scope.employeesPlain);
      var editedEmployees =
      $scope.convertEmployees(response.data)
      angular.copy(editedEmployees, $scope.employees)
    })
  })

  $rootScope.$on('load_all_employees', function(evt, opt){
    $scope.loadAll();
  })

  $scope.addEmployee = function() {
    $scope.newEmp.phoneNumber = utils.convertPhone($scope.newEmp.phoneNumber);
    return EmployeeFactory.addEmployee($scope.newEmp)
    .then(function(result){
      return $scope.loadAll()
      .then(function(){
        $scope.newEmp = {};
        $rootScope.$broadcast('clear_tabs');
      });
    });
  };

  $scope.updateEmployee = function(id){
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

  $scope.close = function(){
    $rootScope.$broadcast('clear_tabs')
  }
});


app.controller('TabController', function($scope, $rootScope){
  $scope.tab = 0;
  $scope.setTab = function(tab){
    $scope.updateClicked = 0;
    $scope.tab = tab;
    if ($scope.tab === 3) $rootScope.$broadcast('load_all_employees');
  };
  $scope.isCurrentTab = function(tab){
    return $scope.tab === tab
  };

  $scope.deleteClicked = 0;
  $scope.updateClicked = 0;
  $scope.currentEmployee = {};
  $scope.setDelete = function(id){
    $scope.deleteClicked = id;
  };

  $scope.clearTabSelections = function(){
    $scope.deleteClicked = 0;
    $scope.updateClicked = 0;
    $scope.tab = 0;
  };

  $rootScope.$on('clear_tabs', function(){
    $scope.clearTabSelections();
  });
  $scope.setUpdate = function(id, employee){
    $scope.updateClicked = id;
    $scope.tab = 0;
    $rootScope.$broadcast('set_employee', employee)
  };

  $scope.isCurrentUpdate = function(id){
    if (id !== $scope.updateClicked) {
      return false;
    } else {
      return true;
    }
  };

  $rootScope.$on('clear_other_tabs', function(evt, opt){
    if (opt === 'add') $scope.updateClicked = 0;
    if (opt === 'update')$scope.tab = 0;
  })

  $scope.setDelete = function(id){
    $scope.deleteClicked = id;
    $rootScope.$broadcast('delete_employee', id)
  };

  $scope.isCurrentDelete = function(id){
    if (id !== $scope.deleteClicked) {
      return false;
    } else {
      return true;
    }
  };
})
