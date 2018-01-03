// import React from 'react'
// import chai, { expect } from 'chai';
// import Enzyme, { configure, shallow, mount } from 'enzyme';
// import {spy} from 'sinon';
// import sinonChai from 'sinon-chai';
// chai.use(sinonChai);
//
// import Adapter from 'enzyme-adapter-react-16';
// import EmployeeInputForm from '../browser/components/EmployeeInputForm';
// import 'jsdom-global/register';
//
// Enzyme.configure({ adapter: new Adapter()})
//
// describe('▒▒▒ React tests ▒▒▒', function () {
//
//   describe('Employee Input Form', () => {
//
//     describe('Interactivity', () => {
//       let employeeInfo, handleClearFormSpy, handleInputChangeSpy, handleSubmitSpy, convertDateSpy, employeeInputWrapper;
//       beforeEach('Create <EmployeeInputForm /> wrapper', () => {
//
//
//       employeeInfo  =  {
//         firstName: 'John',
//         lastName: 'Doe',
//         middleInitial: 'K',
//         emailAddress: 'JohnDone@jd.org',
//         phoneNumber: 8895242456,
//         positionCategory: 'Executive',
//         dateHired: new Date(2018, 1, 10),
//         address1: '1600 Pennsylvania Avenue',
//         address2: 'Apartment 1',
//         city: 'Washington',
//         state: 'DC',
//         zipcode: 20500,
//         active: true
//       },
//       handleClearFormSpy = spy();
//       handleInputChangeSpy = spy();
//       handleSubmitSpy = spy();
//       convertDateSpy = spy();
//       employeeInputWrapper = shallow(<EmployeeInputForm
//         {...employeeInfo}
//         handleClearForm={handleClearFormSpy} handleInputChange={handleInputChangeSpy}
//         handleSubmit={handleSubmitSpy}
//         convertDate={convertDateSpy}
//       />)
//
//       })
//
//       it('when clicked, invokes a function passed in as the handleClearForm property', () => {
//         expect(handleClearFormSpy).not.to.have.been.called;
//         employeeInputWrapper.simulate('click');
//         expect(handleClearFormSpy).to.have.been.called;
//
//       })
//
//
//
//     })
//   })
// })
