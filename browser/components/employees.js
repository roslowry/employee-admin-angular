import React from 'react';
import {convertPhoneNumber, convertAddress, boolToString} from '../../utils';
import {deleteEmployee} from '../reducers/root-reducer';
import store from '../store';
import { Button, Table } from 'react-bootstrap'

export default function(props) {

  const {employees} = props
  return (
    <div>
      <Table className="table" responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Middle Initial</th>
            <th>Last Name</th>
            <th width="50px">Email Address</th>
            <th>Phone Number</th>
            <th>Position Category</th>
            <th>Date Hired</th>
            <th>Address</th>
            <th>Active</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>

          {employees && employees.map(employee => {
            const {address1, address2, city, state, zipcode} = employee;
            const newAddress = convertAddress(address1, address2, city, state, zipcode);
            const activeBool = boolToString(employee.active);
            const dateArr = employee.dateHired.split('-');
            const dateMonth = dateArr[1];
            const dateYear = dateArr[0];
            const date = dateArr[2].slice(0, 2)
            const convertedDate = dateMonth + '-' + date + '-' + dateYear
            return (
              <tr key={employee.id}>
                <th>{employee.id}</th>
                <th>{employee.firstName}</th>
                <th>{employee.middleInitial}</th>
                <th>{employee.lastName}</th>
                <th>{employee.emailAddress}</th>
                <th>{employee.phoneString}</th>
                <th>{employee.positionCategory}</th>
                <th>{convertedDate}</th>
                <th>{newAddress}</th>
                <th>{activeBool}</th>
                <th><Button className="btn btn-primary"  onClick={props.handleUpdateEmployeeClick(employee.id)}>Update</Button></th>
                <th><Button className="btn btn-primary"  onClick={props.handleEmployeeDeleteClick(employee.id)}>Delete</Button></th>
              </tr>
            )
          })}

        </tbody>
      </Table>
    </div>
  )
}
