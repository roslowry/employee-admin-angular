import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
import { Router, Route, hashHistory, IndexRedirect } from 'react-router';
import './index.css';
import store from './store';
import { fetchEmployees } from './reducers/root-reducer';
import AppContainer from './containers/AppContainer';
import EmployeeContainer from './containers/EmployeeContainer';
import AddEmployeeContainer from './containers/AddEmployeeContainer';
import SearchLastName from './containers/SearchLastName';


const loadEmployees = () => {
  store.dispatch(fetchEmployees())
}

function test(){
  return (
    <div>Hey there! This is just a test component to ensure React Router is configured properly.</div>
  )
}

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={AppContainer} onEnter={loadEmployees}>
      <Route path="/employee-list" component={EmployeeContainer} />
      <IndexRedirect to="/employee-list" />
    </Route>
  </Router>,
  document.getElementById('app')
)
