import React, { Component } from 'react';
import { states } from '../../utils';
import axios from 'axios';
import store from '../store';
import { updateEmployee } from '../reducers/root-reducer'
// import { addEmployee } from '../reducers/root-reducer'


export default class extends Component {
  constructor(props){
    super(props)
    this.state = Object.assign({
      numIncreasingInSize: true,
      phoneNumber: ''
    }, store.getState())
    this.handlePhoneChange = this.handlePhoneChange.bind(this);
    this.phoneNumberWithDashes = this.phoneNumberWithDashes.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount () {
    this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState().employeeToUpdate)
    })
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
    this.setState({
      [name] : value
    })

    console.log(this.state[name])
  }

  handleDateChange(event){
    this.setState({
      date: event.target.value
    })
  }


  handleSubmit(event) {
    event.preventDefault();
    let {firstName, middleInitial, lastName, emailAddress, phoneNumber, positionCategory, dateHired, address1, address2, city, state, zipcode, active, id} = this.state;
    console.log(this.state)
    phoneNumber = phoneNumber.split('-').join('');
    const dateArr = dateHired.split('-');
    dateHired = new Date(parseInt(dateArr[0]), parseInt(dateArr[1]), parseInt(dateArr[2]));
    store.dispatch(updateEmployee(id, {firstName, middleInitial, lastName, emailAddress, phoneNumber, positionCategory, dateHired, address1, address2, city, state, zipcode, active}))
  }

  convertDate(date){
    console.log('date is', date)
    return date.toString().slice(0,13).split('-').join('-')
  }

  render(){
    // console.log('this.state in update employee is', this.state)
    const {active, address1, address2, city, dateHired, emailAddress, firstName, lastName, middleInitial, phoneNumber, positionCategory, state, zipcode} = this.props.employee

    // console.log('date hired is', dateHired)

    return (
      <div>
        <form className="form-group" onSubmit={this.handleSubmit}>
          <label htmlFor="firstName"><small>First Name</small><span style={{color: "red"}}>*</span></label>
          <input name="firstName" type="text" onChange={this.handleInputChange} value={firstName}/>
          <label htmlFor="lastName"><small>Last Name</small><span style={{color: "red"}}>*</span></label>
          <input name="lastName" type="text" value={lastName} onChange={this.handleInputChange}></input>
          <label htmlFor="middleInitial"><small>Middle Initial</small></label>
          <input name="middleInitial" type="text" onChange={this.handleInputChange} value={middleInitial}></input>
          <label htmlFor="emailAddress"><small>Email Address</small><span style={{color: "red"}}>*</span></label>
          <input name="emailAddress" type="text "value={emailAddress} onChange={this.handleInputChange} ></input>
          <label htmlFor="phoneNumber"><small>Phone Number</small></label>
          <input
             name="phoneNumber"
             onChange={this.handlePhoneChange}
             value={this.state.numIncreasingInSize ? this.phoneNumberWithDashes(phoneNumber) : this.state.phoneNumber}
             >
          </input>
          <label htmlFor="positionCategory"><small>Position Category</small></label>
          <select name="positionCategory" onChange={this.handleInputChange} value={positionCategory}>
            <option value="Indirect">Indirect</option>
            <option value="Direct">Direct</option>
            <option value="Program Manager">Program Manager</option>
            <option value="Director">Director</option>
            <option value="Executive">Executive</option>
          </select>
          <label htmlFor="date"><small>Date Hired</small><span style={{color: "red"}}>*</span></label>
          <input type="date" name="dateHired" onChange={this.handleInputChange} value={this.convertDate(dateHired)}></input>
          <label htmlFor="address1" ><small>Address 1</small></label>
          <input name="address1" type="text" onChange={this.handleInputChange} value={address1}></input>
          <label htmlFor="address2" ><small>Address 2</small></label>
          <input name="address2" type="text" onChange={this.handleInputChange} value={address2}></input>
          <label htmlFor="city" ><small>City</small></label>
          <input name="city" type="text" onChange={this.handleInputChange} value={city}></input>
          <label htmlFor="state"><small>State</small></label>
          <select value={state} name="state" onChange={this.handleInputChange}>
             {states.map((state, index) => {
               return <option  key={index} value={state}>{state}</option>
             })}
           </select>
           <label htmlFor="zipcode"><small>Zip Code</small></label>
           <input name="zipcode" type="text" value={zipcode} onChange={this.handleInputChange} ></input>
           <label htmlFor="active"><small>Active</small><span style={{color: "red"}}>*</span></label>
           <select name="active" value={active} onChange={this.handleInputChange}>
              <option value={true}>True</option>
              <option value={false}>False</option>
          </select>
          <button type="submit" onSubmit={this.handleSubmit}>Submit</button>
        </form>
        <button onClick={this.props.handleClearForm}>Close</button>
      </div>
    )

  }
}
