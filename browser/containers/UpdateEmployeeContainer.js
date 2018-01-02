import React, { Component } from 'react';
import { states } from '../../utils';
import axios from 'axios';
import store from '../store';
import { updateEmployee, clearFormUpdatingStatus } from '../reducers/root-reducer';
import EmployeeInputForm from '../components/EmployeeInputForm';

export default class extends Component {
  constructor(props){
    super(props)
    this.state = Object.assign({
      numIncreasingInSize: true,
      phoneNumber: ''
    }, store.getState().employeeToUpdate)
    this.handlePhoneChange = this.handlePhoneChange.bind(this);
    this.phoneNumberWithDashes = this.phoneNumberWithDashes.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClearUpdateForm = this.handleClearUpdateForm.bind(this)

  }

  componentDidMount () {
    this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState().employeeToUpdate)
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
    const name = event.target.name;
    const value = event.target.value;
    const attrToUpdate = ' employeeToUpdate.' + name;
    this.setState({
      [name] : value
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    let {firstName, middleInitial, lastName, emailAddress, phoneNumber, positionCategory, dateHired, address1, address2, city, state, zipcode, active, id} = this.state;
    phoneNumber = phoneNumber.split('-').join('');
    const dateArr = dateHired.split('-');
    dateHired = new Date(parseInt(dateArr[0]), parseInt(dateArr[1]), parseInt(dateArr[2]));
    store.dispatch(updateEmployee(id, {firstName, middleInitial, lastName, emailAddress, phoneNumber, positionCategory, dateHired, address1, address2, city, state, zipcode, active}))
  }

  convertDate(date){
    return date.toString().slice(0,13).split('-').join('-')
  }

  handleClearUpdateForm(){
    store.dispatch(clearFormUpdatingStatus())
  }

  render(){
    return (
      <div>
        <EmployeeInputForm {...this.state}
          title={"Update Employee"}
         handleSubmit={this.handleSubmit}
         convertDate={this.convertDate}
         handleInputChange={this.handleInputChange}
         handlePhoneChange={this.handlePhoneChange}
         phoneNumberWithDashes={this.phoneNumberWithDashes}
         numIncreasingInSize={this.state.numIncreasingInSize}
         handleClearForm={this.handleClearUpdateForm}
        />
      </div>

    )
  }
}
