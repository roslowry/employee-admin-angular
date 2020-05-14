(function(){
  // 'use strict';

  console.log('hiiiii');
  // console.log(employeeAdminApp)

  angular.module('employeeAdminApp').directive('allEmployees', function(){
    return {
      restrict: 'C',
      templateUrl: 'employee/employee.tpl.html',
      controller: function($scope, EmployeeRestService, AppUtilsService, $http, $uibModal){

        // Initialize state
        loadEmployees();

        $scope.lastName = "";

        $scope.deleteEmployee = function(id){
          return EmployeeRestService.deleteEmployee(id)
          .then(loadEmployees);
        }

        $scope.updateEmployee = function(employee){
           openEmployeeModal({
            newEmployee: false,
            employee: angular.copy(employee, {})
          });

          // .then(function(employees){
        }

        $scope.searchEmployeesByLastName = function(){
          EmployeeRestService.searchEmployeesByLastName($scope.lastName)
          .then(function(response){
            $scope.employees  = response;
          })
        }

        $scope.loadEmployees = loadEmployees;

        $scope.addEmployee = function(){
          console.log('hi')

          openEmployeeModal({
            newEmployee: true,
            employee: {}
          })
          
        }

        function loadEmployees(){
          EmployeeRestService.getAllEmployees()
          .then(function(response){
            $scope.employees = response;
          });

        }

        function openEmployeeModal(options){
            $uibModal.open({
            templateUrl: 'employee/employeeUpdateForm.tpl.html',
            animation: true,
            resolve: {
              employee: function(){
                var employeeObj = options.newEmployee ? {} : options.employee;
                return employeeObj;
              }
            },
            controller: function($scope, $uibModalInstance, employee){
              $scope.employee = employee;
              $scope.employee.address2 = $scope.employee.address2 ? $scope.employee.adress2 : '';
              $scope.states = AppUtilsService.getStates();
              $scope.areInputsValid = true; 
              $scope.headerMessage = options.update ? 'Update Employee' : 'Add Employee';
              $scope.warningText = 'Please complete all fields';

              $scope.submit = function(){
                if (validateEmployee($scope.employee)) {
                   if (options.newEmployee) {
                        createEmployee(serializeEmployee($scope.employee))
                      .then(function(){
                        loadEmployees();
                        $uibModalInstance.close();
                      });
                  } else {
                    updateEmployee(serializeEmployee($scope.employee))
                    .then(function(){
                      loadEmployees();
                      $uibModalInstance.close();
                    });
                  }
                  $scope.areInputsValid = true;
                } else {
                  $scope.areInputsValid = false;
                }

              }


              $scope.close = function(){
                setTimeout(function() {
                  $uibModalInstance.close({
                  animation: true
                });
                }, 200);
        
              }

              // $scope.transformPhoneNumber = function(){

              //   var num = $scope.employee.phoneNumber;
              //   var length = num.length;

              //   if ((length !==4) && (length !== 8)){
              //     if (num[length] === "-") {
              //       num = num.split("");
              //       num.splice(length -1, 1);
              //       num = num.join();
              //       $scope.employee.number = num
              //     }
              //   }



              //   if (num.length === 3) {
              //     num += "-"
              //   }
              //   if (num.length === 7) {
              //     num += "-"
              //   } 

                /*
                edge cases:

                1. dash in middle of a segment of numbers (excluding 4th or 8th char)
                2. Long phone number


                Approach:

                1. 
                */


              //   $scope.employee.phoneNumber = num;
              //   // if (num.length >= 4 && num.charat(4) !== "-") {
              //   //   // num = num
              //   //   num = num.split().splice(4, 0, "-").join();;
              //   // } 
              //   // if (num.length >= )


              //   console.log($scope.employee.phoneNumber);
              // }

              function createEmployee(employee){

                  return EmployeeRestService.createEmployee(employee);
                  // .then(function(){
                  //   loadEmployees();
                  //   $uibModalInstance.close();
                  // });

              }

              function updateEmployee(employee){

                return   EmployeeRestService.updateEmployee(employee)

              }

              function validateEmployee(employee){
                var e = employee;
                if (e.firstName && e.middleInitial && e.lastName && e.phoneNumber && e.emailAddress && e.address1 && e.city && e.state && e.zipcode && e.positionCategory) {
                  return true;
                } else {
                  return false;
                }
              }


              function serializeEmployee(employee){
                delete employee.fullName;
                employee.phoneNumber =  employee.phoneNumber.split('').filter(function(val){
                  return ([1,2,3,4,5,6,7,8,9,0].includes(Number(val)))
                }).join('');
                employee.dateHired = new Date();
                return employee;

              }
  
            }
          })
        }

          // })

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

      // local utility methods






      }
      // ',
      // controllerUrl: 'employee/employeeCtrl.js',
    }
  })
})(window.angular);



// // angular.directive()
// (function(){
//   'use strict';
  
//   employeeAdminApp.directive('employee', function(){
//     return {
//       restrict: 'E',
//       templateUrl: 'employee/employee.tpl.html',
//       controller: EmployeeController
//     }
//   });
  
//   EmployeeController.$inject = ['$scope', '$rootScope', 'employeeRestService'];
  
//   function EmployeeController($scope, $rootScope, employeeRestService){








      
//     $scope.employees = [];
    

//     // $scope.employeesPlain = [];
//     // $scope.newEmp = {};
//     // $scope.empLastName = {};
//     // $scope.updateEmp = {};
//     // $scope.states = utils.states;
//     // $scope.bools = [true, false];

//     // Initialize employee state
//     employeeRestService.getAllEmployees()
//     .then(function(response){
//       var employees = response.data;
//       $scope.employees = convertEmployees(employees);      
//     });
    
    
//     $scope.currentTab = 0;
    
//     $scope.updateEmployee = function(employee){
      
//       // $uibModel.open()
      
//       $scope.updateEmp.phoneNumber = utils.convertPhone($scope.updateEmp.phoneNumber);
//       return EmployeeFactory.updateEmployee(id, $scope.updateEmp)
//       .then(function(result){
//         return $scope.loadAll()
//         .then(function(){
//           $scope.updateEmp = {};
//           $rootScope.$broadcast('clear_tabs');
//         });
//       });
//     };    
    
//     // Utility Functions
//     function convertEmployees(employees){
//       return employees.map(function(employee){
//         return utils.convertEmployee(employee);
//       });
//     }
    
    
    
    
    
    
//     // $scope.convertEmployees = function(employees) {
//     //   return employees.map(function(employee){
//     //     return utils.convertEmployee(employee)
//     //   })
//     // }
    

//           // $scope.loadAll = function(){
//           //   return EmployeeFactory.getAllEmployees()
//           //   .then(function(response){
//           //     console.log('the employees are', response)
//           //     angular.copy(response.data, $scope.employeesPlain);
//           //     var editedEmployees =
//           //     $scope.convertEmployees(response.data)
//           //     angular.copy(editedEmployees, $scope.employees)
//           //   })
//           // }
//           // 
//           // $scope.searchLastName = function() {
//           //   return EmployeeFactory.searchLastName($scope.empLastName.lastName)
//           //   .then(function(response){
//           //     angular.copy(response.data, $scope.employeesPlain);
//           //     var editedEmployees =
//           //     $scope.convertEmployees(response.data)
//           //     angular.copy(editedEmployees, $scope.employees)
//           //     $scope.empLastName = {};
//           //   })
//           // }
//           // 
//           // $scope.loadAll();
//           // 
//           // $rootScope.$on('set_employee', function(evt, opt){
//           //   opt.dateHired = utils.convertDate(opt.dateHired);
//           //   $scope.updateEmp = opt;
//           // })
//           // 
//           // $rootScope.$on('delete_employee', function(evt, opt){
//           //   return EmployeeFactory.deleteEmployee(opt)
//           //   .then(function(response){
//           // 
//           //     angular.copy(response.data, $scope.employeesPlain);
//           //     var editedEmployees =
//           //     $scope.convertEmployees(response.data)
//           //     angular.copy(editedEmployees, $scope.employees)
//           //   })
//           // })
//           // 
//           // $rootScope.$on('load_all_employees', function(evt, opt){
//           //   $scope.loadAll();
//           // })
//           // 
//           // $scope.addEmployee = function() {
//           //   $scope.newEmp.phoneNumber = utils.convertPhone($scope.newEmp.phoneNumber);
//           //   return EmployeeFactory.addEmployee($scope.newEmp)
//           //   .then(function(result){
//           //     return $scope.loadAll()
//           //     .then(function(){
//           //       $scope.newEmp = {};
//           //       $rootScope.$broadcast('clear_tabs');
//           //     });
//           //   });
//           // };
//           // 
//           // $scope.updateEmployee = function(id){
//           //   $scope.updateEmp.phoneNumber = utils.convertPhone($scope.updateEmp.phoneNumber);
//           //   return EmployeeFactory.updateEmployee(id, $scope.updateEmp)
//           //   .then(function(result){
//           //     return $scope.loadAll()
//           //     .then(function(){
//           //       $scope.updateEmp = {};
//           //       $rootScope.$broadcast('clear_tabs');
//           //     });
//           //   });
//           // };

//     // $scope.close = function(){
//     //   $rootScope.$broadcast('clear_tabs')
//     // }
//   };

  
// })(window.angular)