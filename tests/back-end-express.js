import chai, { expect } from 'chai';
import app from '../server/main'
import {spy} from 'sinon';
import supertest from 'supertest';
const agent = supertest.agent(app)
import sinonChai from 'sinon-chai';
chai.use(sinonChai);
import { createStore, applyMiddleware } from 'redux';
import turnOnDb from '../server/db/db'
import Adapter from 'enzyme-adapter-react-16';
import 'jsdom-global/register';
import db  from '../server/db/';
const Employee = db.model('employee');
import { createEmployee } from '../server/db/seed-files/seed-utils'

describe('http requests', function(){

  describe('GET requests', function(){

    describe('GET /api/employees', function() {
      it('responds wtih a 200 status code', function(done){
        agent
        .get('/api/employees/')
        .expect(200, done)

      })

    })
    describe('GET /api/employees/:id', function() {
      it('responds wtih a 200 status code', function(done){
        agent
        .get('/api/employees/2')
        .expect(200, done)

      })

    })
  })

  describe('POST requests', function(){

    describe('get /api/employees/new-employee', function(){
      it('responds with an updated instance', function(done){
        agent
        .post('/api/employees/new-employee')
        .send(createEmployee())
        .expect(201, done)
      })

    })
  })
})
