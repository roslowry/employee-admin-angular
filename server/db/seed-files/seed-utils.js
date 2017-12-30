const {createFullName, generateEmail, generatePhoneNumber, generatePositionCategory, generateAddress, generateState, generateZipCode, generateActiveBool, generateCity, generateHireDate} = require('./name-utils')

function createEmployee() {
  const user = {}
  const [firstName, middleInitial, lastName] = createFullName()
  const [address1, address2] = generateAddress();
  user.firstName = firstName;
  user.lastName = lastName;
  user.middleInitial = middleInitial;
  user.emailAddress = generateEmail(firstName, lastName);
  user.phoneNumber = generatePhoneNumber();
  user.positionCategory = generatePositionCategory();
  user.dateHired = generateHireDate();
  user.address1 = address1;
  user.address2 = address2;
  user.city = generateCity();
  user.state = generateState();
  user.zipcode = generateZipCode();
  user.active = generateActiveBool();
  return user
}

module.exports = createEmployee
