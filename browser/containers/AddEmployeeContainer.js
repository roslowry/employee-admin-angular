import React, { Component } from 'react';
import { states } from '../../utils';
import axios from 'axios';
import store from '../store';
import { updateEmployee } from '../reducers/root-reducer';
import EmployeeInputForm from '../components/EmployeeInputForm';
import { addEmployee } from '../reducers/root-reducer'


export default class extends Component {

  constructor(props){
    super(props)
    this.state = Object.assign({
      numIncreasingInSize: true,
      dateHired: '',
      phoneNumber: '',
      valid: true,
      validateMessage: ''
    }, store.getState())
    this.handlePhoneChange = this.handlePhoneChange.bind(this);
    this.phoneNumberWithDashes = this.phoneNumberWithDashes.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClearUpdateForm = this.handleClearUpdateForm.bind(this);
    this.validateForm = this.validateForm.bind(this)
  }

  componentDidMount () {
    this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState())
    })
  }


  componentWillUnmount(){
    this.unsubscribe()
  }


  handlePhoneChange(event){
    const prevLength = this.state.phoneNumber;
    const currentLength = event.target.value;
    const increasingSize = (currentLength > prevLength) ? true : false
    this.setState({
      phoneNumber: event.target.value,
      numIncreasingInSize: increasingSize
    })
  }

  phoneNumberWithDashes(phoneNumber){
    let phoneNum = phoneNumber.split('-').join('');
    if (phoneNum.length >= 6) {
      return phoneNum.toString().slice(0, 3) + '-' + phoneNum.toString().slice(3, 6) + '-' + phoneNum.toString().slice(6)
    } else if (phoneNum.length >= 3) {
      return phoneNum.toString().slice(0, 3) + '-' + phoneNum.toString().slice(3, 6)
    } else {
      return phoneNum.toString().slice(0, 3)
    }
  }

  handleInputChange(event) {
    console.log('udpating')
    const name = event.target.name;
    const value = event.target.value;
    const attrToUpdate = ' employeeToUpdate.' + name;
    console.log('this.state change is', this.state)
    this.setState({
      [name] : value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log('handle submit)')
    const validateStatus = this.validateForm();
    if (validateStatus) {
      console.log('inside first if of validate form');
      console.log('validate status is', validateStatus)
      this.setState({
        valid: false,
        validateMessage: validateStatus
      });
      // return
    } else {
      let {firstName, middleInitial, lastName, emailAddress, phoneNumber, positionCategory, dateHired, address1, address2, city, state, zipcode, active} = this.state;
      phoneNumber = phoneNumber.split('-').join('');
      const dateArr = dateHired.split('-');
      dateHired = new Date(parseInt(dateArr[0]), parseInt(dateArr[1]), parseInt(dateArr[2]));
      store.dispatch(addEmployee({firstName, middleInitial, lastName, emailAddress, phoneNumber, positionCategory, dateHired, address1, address2, city, state, zipcode, active}))
    }
  }


  validateForm(){
    const notYetValid = {}
    const valsToCheck = ['emailAddress', 'firstName', 'lastName', 'dateHired', 'active'];
    valsToCheck.forEach(val => {
      console.log('checking validation for', val, this.state[val])
      if (!this.state[val]) notYetValid[val] = true;
    })
    if (!Object.keys(notYetValid).length) return false;
    return `Please complete the following: ` + Object.keys(notYetValid).join(', ')

  }


  convertDate(date){
    return date.toString().slice(0,13).split('-').join('-')
  }

  handleClearUpdateForm(){
    store.dispatch(clearFormUpdatingStatus())
  }

  render(){
    console.log('in the re-render')
    return (
      <div>
        <EmployeeInputForm {...this.state}
          title={"Add New Employee"}
          handleSubmit={this.handleSubmit}
          convertDate={this.convertDate}
          handleInputChange={this.handleInputChange}
          handlePhoneChange={this.handlePhoneChange}
          phoneNumberWithDashes={this.phoneNumberWithDashes}
          numIncreasingInSize={this.state.numIncreasingInSize}
          handleClearForm={this.props.handleClearForm}
          validateStatus={this.state.valid}
          validateMessage={this.state.validateMessage}
        />
      </div>

    )
  }
}
