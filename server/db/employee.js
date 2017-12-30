const Sequelize = require('sequelize')
const db = require('./db.js');
// console.log('data', data)



// Object.keys(db).length
const states = require('../../utils').states;

module.exports = db.define('employee', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  middleInitial: Sequelize.STRING,
  emailAddress: Sequelize.STRING,
  phoneNumber: {
    type: Sequelize.STRING,
    // type: Sequelize.ARRAY(Sequelize.STRING),
    allowNull: false,
    unique: true,
    validate: {
      isValid: function(value) {
          var newVal = value.split('');
          for (var i = 0; i < newVal.length; i++) {
            var currentVal = parseInt(newVal[i]);
            // rexexp would probably be better here : )
            var nums = [0,1,2,3,4,5,6,7,8,9];
            if (!nums.includes(currentVal)) throw new Error('Please only include numbers!')
          }
        }
      }
    },
    positionCategory: {
      type: Sequelize.ENUM("Indirect", "Direct", "Program Manager", "Director", "Executive")
    },

    // ,
    // validate: {
    //   isValid: function(value) {
    //     if (!value) return value;
    //     var value = Array.isArray(value) ? value : [value];
    //     values.forEach(function(val){
    //       var newVal = val.split('');
    //       for (var i = 0; i < newVal.length; i++) {
    //         var currentVal = parseInt(newVal[i]);
    //         // rexexp would probably be better here : )
    //         var nums = [0,1,2,3,4,5,6,7,8,9];
    //         if (!nums.includes(currentVal)) throw new Error('Please only include numbers!')
    //       }
    //     })
    //   }
    // }
  // },
  dateHired: {
    type: Sequelize.DATE,
    // defaultValue: Sequelize.NOW,
    allowNull: false
  },
  address1: Sequelize.STRING,
  address2: Sequelize.STRING,
  city: Sequelize.STRING,
  state: Sequelize.ENUM(...states),
  zipcode: {
    type: Sequelize.STRING,
    allowNull: false,
    not: ["[a-z]",'i']
    // ,
    // validate: {
    //   checkZip: function(value) {
    //     var regexp = /^[0-9]+$/;
    //     if (!value) return value;
    //     if (value.length !== 5) {
    //       throw new Error('Please enter a five-digit zip code! ')
    //     } else if (!regexp.test(val)) {
    //       throw new Error('Please enter numbers only!')
    //     }
    //   }
    // }
  },
  active: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: true
  }
},
{
  getterMethods: {
    fullName: function(){
      return this.firstName + ' ' + this.middleInitial + '. ' + this.lastName
    },
    phoneString: function(){
      return this.phoneNumber.toString().slice(0, 3) + '-' + this.phoneNumber.toString().slice(3, 6) + '-' + this.phoneNumber.toString().slice(6)
    }
  }
})














//
//
//
// phone: {
//     type: Sequelize.ARRAY(Sequelize.STRING),
//     allowNull: false,
//     unique: true,
//     validate: {
//         isValidPhoneNo: function(value) {
//             if (!value) return value;
//
//             var regexp = /^[0-9]+$/;
//             var values = (Array.isArray(value)) ? value : [value];
//
//             values.forEach(function(val) {
//                 if (!regexp.test(val)) {
//                     throw new Error("Number only is allowed.");
//                 }
//             });
//             return value;
//         }
//     }
// }
