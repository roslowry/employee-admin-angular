import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
import { Router, Route, hashHistory, IndexRedirect } from 'react-router';
import './index.css';
import store from './store';
import { fetchEmployees } from './reducers/root-reducer';
import AppContainer from './containers/AppContainer';
import EmployeeContainer from './containers/EmployeeContainer'


const loadEmployees = () => {
  store.dispatch(fetchEmployees())
}


function test(){
  return (
    <div>Hey there! HA HA HA</div>
  )
}

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={AppContainer} onEnter={loadEmployees}>
      <Route path="/employee-list" component={EmployeeContainer} />
      <Route path="/delete-me" component={test} />
      <IndexRedirect to="/employee-list" />
    </Route>
  </Router>,
  document.getElementById('app')
)
