const {createFullName, generateEmail, generatePhoneNumber, generateAddress, generateState, generateZipCode, generateActiveBool} = require('./name-utils')

function createUser() {
  const user = {}
  const [firstName, middleInitial, lastName] = createFullName()
  const [address1, address2] = generateAddress();
  user.firstName = firstName;
  user.lastName = lastName;
  user.middleInitial = middleInitial;
  user.emailAddress = generateEmail(firstName, lastName);
  user.phoneNumber = generatePhoneNumber();
  user.address1 = address1;
  user.address2 = address2;
  user.state = generateState();
  user.zipcode = generateZipCode();
  user.active = generateActiveBool();

  return user
}

console.log('new user is', createUser())
