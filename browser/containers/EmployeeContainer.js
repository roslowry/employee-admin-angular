import React from 'react';
import store from '../store';
import Employees from '../components/employees';
import AddEmployeeContainer from '../containers/AddEmployeeContainer';
import UpdateEmployeeContainer from '../containers/UpdateEmployeeContainer';
import SearchByLastName from './SearchLastName'
import { deleteEmployee, fetchSingleEmployee, clearFormUpdatingStatus, fetchEmployees} from '../reducers/root-reducer';
import { Button } from 'react-bootstrap'

export default class extends React.Component {
  constructor(props){
    super(props)
    this.state = store.getState();
    this.state.addNewEmployeeClicked = false;
    this.state.updateEmployeeClicked = false;
    this.state.searchByLastNameClicked = false;
    this.handleAddEmployeeClick = this.handleAddEmployeeClick.bind(this);
    this.handleEmployeeDeleteClick = this.handleEmployeeDeleteClick.bind(this);
    this.handleUpdateEmployeeClick = this.handleUpdateEmployeeClick.bind(this);
    this.handleClearUpdateForm = this.handleClearUpdateForm.bind(this);
    this.handleSearchByLastNameClick = this.handleSearchByLastNameClick.bind(this);
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

  handleSearchByLastNameClick(){
    this.setState({
      searchByLastNameClicked: !this.state.searchByLastNameClicked
    })
  }

  // handleCloseUpdateClick(){
  //   this.setState({
  //     addNewEmployeeClicked: !this.state.closeUpdateClicked
  //   })
  // }

  handleUpdateEmployeeClick(employeeId){
    return () => {
      store.dispatch(fetchSingleEmployee(employeeId));
    }
  }

  handleEmployeeDeleteClick(employeeId){
    return () => {
      store.dispatch(deleteEmployee(employeeId))
    }
  }

  handleClearUpdateForm(){
    store.dispatch(clearFormUpdatingStatus())
  }

  resetEmployeeList(){
    store.dispatch(fetchEmployees())
  }

  render() {
    const {employeeToUpdate} = this.state
    return (
      <div className="employee-view">
        <div className="option-buttons">
          {this.state.addNewEmployeeClicked ? <AddEmployeeContainer
            handleClearForm={this.handleAddEmployeeClick} /> : null}
          {this.state.formUpdating ? <UpdateEmployeeContainer employee={employeeToUpdate}
          handleClearForm={this.handleClearUpdateForm} /> : null}
          {!this.state.addNewEmployeeClicked ? <Button className="btn btn-primary btn-lg margin-right" onClick={this.handleAddEmployeeClick}>Add Employee</Button> : null }
          {this.props.children}
          {this.state.searchByLastNameClicked ? <SearchByLastName handleSearchByLastNameClick={this.handleSearchByLastNameClick} /> : null }
          {!this.state.searchByLastNameClicked ? <Button className="btn btn-primary btn-lg margin-right" onClick={this.handleSearchByLastNameClick}>Searcy by Last Name</Button> : null }
          <Button className="btn btn-primary btn-lg margin-right" onClick={this.resetEmployeeList}>Reset Employee List</Button>
          {this.props.children}
        </div>
        <Employees
          employees={this.state.employees}
          handleEmployeeDeleteClick={this.handleEmployeeDeleteClick}
          handleUpdateEmployeeClick={this.handleUpdateEmployeeClick}
         />
      </div>
    )
  }
}
