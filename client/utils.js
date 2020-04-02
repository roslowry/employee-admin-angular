var utils = (function(){
  return {
    convertPhoneNumber: function (number) {
      return number.toString().slice(0, 3) + '-' + number.toString().slice(3, 6) + '-' + number.toString.slice(6)
    },
    convertAddress: function(line1, line2, city, state, zip) {
      var newAddress = line2 ? line1 + "\n" + line2 + "\n" + city + ', ' + state + ' ' + zip : line1 + "\n" + city + ', ' + state + ' ' + zip;
      return newAddress
    },

    convertDate: function(date){
      return new Date(date.toString().slice(0,13).split('-').join('-'))
    },
    boolToString: function (bool) {
      var newBool = bool.toString();
      var splitBool = newBool.split('')
      splitBool[0] = splitBool[0].toUpperCase();
      return splitBool.join('');
    },
    convertEmployee: function(employee){
      var address1 = employee.address1;
      var address2 = employee.address2;
      var city = employee.city;
      var state = employee.state;
      var zipcode = employee.zipcode;
      var dateArr = employee.dateHired.split('-');
      var dateMonth = dateArr[1];
      var dateYear = dateArr[0];
      var date = dateArr[2].slice(0, 2);
      var convertedDate = dateMonth + '-' + date + '-' + dateYear;
      // new fields;
      employee.convertedAddress =  utils.convertAddress(address1, address2, city, state, zipcode);
      employee.convertedActive = utils.boolToString(employee.active);
      employee.convertedDate = convertedDate;
      return employee
    },
    convertPhone: function(num){
      console.log('number received', num)
      var nums = [0,1,2,3,4,5,6,7,8,9].map(function(val){
        return val.toString()
      });
      return num.split('').filter(function(val){
        return (nums.includes(val))
      }).join('')
    },
    states: [
      "AK",
      "AL",
      "AR",
      "AZ",
      "CA",
      "CO",
      "CT",
      "DC",
      "DE",
      "FL",
      "GA",
      "HI",
      "IA",
      "ID",
      "IL",
      "IN",
      "KS",
      "KY",
      "LA",
      "MA",
      "MD",
      "ME",
      "MI",
      "MN",
      "MO",
      "MS",
      "MT",
      "NC",
      "ND",
      "NE",
      "NH",
      "NJ",
      "NM",
      "NV",
      "NY",
      "OH",
      "OK",
      "OR",
      "PA",
      "RI",
      "SC",
      "SD",
      "TN",
      "TX",
      "UT",
      "VA",
      "VT",
      "WA",
      "WI",
      "WV",
      "WY"
    ]
  }
})()

// var convertPhoneNumber = function (number) {
//   return number.toString().slice(0, 3) + '-' + number.toString().slice(3, 6) + '-' + number.toString.slice(6)
// }
//
// var convertAddress = function(line1, line2, city, state, zip) {
//   var newAddress = line2 ? line1 + "\n" + line2 + "\n" + city + ', ' + state + ' ' + zip : line1 + "\n" + city + ', ' + state + ' ' + zip;
//   return newAddress
//   // return `${line1}\n${line2}\n${city}, ${state} ${zip}
// }
//
// var boolToString = function (bool) {
//   var newBool = bool.toString();
//   var splitBool = newBool.split('')
//   splitBool[0] = splitBool[0].toUpperCase();
//   return splitBool.join('');
// }
//
// module.exports = {states, convertPhoneNumber, convertAddress, boolToString}
