import React from 'react';
import store from '../store';
import Employees from '../components/employees';
import AddEmployee from '../components/add-employee';
import UpdateEmployee from '../components/update-employee';
console.log('add employee is a react component', AddEmployee);

import { deleteEmployee, fetchSingleEmployee} from '../reducers/root-reducer'

export default class extends React.Component {
  constructor(props){
    // are there props here?
    super(props)
    this.state = store.getState();
    this.state.addNewEmployeeClicked = false;
    this.state.updateEmployeeClicked = false;

    this.handleAddEmployeeClick = this.handleAddEmployeeClick.bind(this);
    this.handleEmployeeDeleteClick = this.handleEmployeeDeleteClick.bind(this);
    this.handleUpdateEmployeeClick = this.handleUpdateEmployeeClick.bind(this)
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState())
    })
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  handleAddEmployeeClick(){

    this.setState({
      addNewEmployeeClicked: !this.state.addNewEmployeeClicked
    })
  }

  handleUpdateEmployeeClick(employeeId){

    return () => {
      this.setState({
        updateEmployeeClicked: !this.state.updateEmployeeClicked
      })
      store.dispatch(fetchSingleEmployee(employeeId));
      console.log('state updating', this.state)
    }
  }

  handleEmployeeDeleteClick(employeeId){

    console.log('handle employee delete click,plus: employeeId and typeof employeeId', employeeId, typeof employeeId)
    return () => {
      store.dispatch(deleteEmployee(employeeId))
    }
  }

  render() {
    console.log('state in employee container is', this.state);
    // console.log('props in employee container are', this.props)
    return (
      <div>
        {this.state.addNewEmployeeClicked ? <AddEmployee /> : null}
        {this.state.formUpdating ? <UpdateEmployee /> : null}
        <button onClick={this.handleAddEmployeeClick}>{this.state.addNewEmployeeClicked ? 'Hide' : 'Add Employee'}</button>
        <Employees
          employees={this.state.employees}
          handleEmployeeDeleteClick={this.handleEmployeeDeleteClick}
          handleUpdateEmployeeClick={this.handleUpdateEmployeeClick}
         />
      </div>
    )
  }
}
