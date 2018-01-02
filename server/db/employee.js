const Sequelize = require('sequelize')
const db = require('./db.js');
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
    allowNull: false,
    unique: true,
    validate: {
      isValid: function(value) {
        var newVal = value.split('');
        for (var i = 0; i < newVal.length; i++) {
          var currentVal = parseInt(newVal[i]);
          var nums = [0,1,2,3,4,5,6,7,8,9];
          if (!nums.includes(currentVal)) throw new Error('Please only include numbers!')
        }
      }
    }
  },
  positionCategory: {
    type: Sequelize.ENUM("Indirect", "Direct", "Program Manager", "Director", "Executive")
  },
  dateHired: {
    type: Sequelize.DATE,
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
