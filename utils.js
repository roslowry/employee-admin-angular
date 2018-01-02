const convertPhoneNumber = function (number) {
  return number.toString().slice(0, 3) + '-' + number.toString().slice(3, 6) + '-' + number.toString.slice(6)
}

const convertAddress = function(line1, line2, city, state, zip) {
  const newAddress = line2 ? line1 + "\n" + line2 + "\n" + city + ', ' + state + ' ' + zip : line1 + "\n" + city + ', ' + state + ' ' + zip;
  return newAddress
  // return `${line1}\n${line2}\n${city}, ${state} ${zip}
}

const boolToString = function (bool) {
  const newBool = bool.toString();
  const splitBool = newBool.split('')
  splitBool[0] = splitBool[0].toUpperCase();
  return splitBool.join('');
}

const states = [
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

module.exports = {states, convertPhoneNumber, convertAddress, boolToString}
