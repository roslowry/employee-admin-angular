import React from 'react';
import store from '../store';
import { findEmployeesByLastName } from '../reducers/root-reducer';
import { Modal, Button, ButtonToolbar } from 'react-bootstrap';

export default class extends React.Component {
  constructor(props){
    super(props)
    this.state = Object.assign({}, {
      lastName: ''
    }, store.getState())

    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  componentDidMount(){
    this.unsubscribe = store.subscribe(()=> {
      this.setState(store.getState())})
  }

  handleLastNameChange (event) {
    this.setState({
      lastName: event.target.value
    })
  }

  handleSubmit(event){
    event.preventDefault();
    store.dispatch(findEmployeesByLastName(this.state.lastName))
    this.props.handleSearchByLastNameClick()
  }

  handleCancel(){
    this.props.handleSearchByLastNameClick()
  }

  componentWillUnmount(){
    this.unsubscribe();
  }

  render(){
    return (
      <div className="static-modal">
        <form onSubmit={this.handleSubmit} className="form-group">
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>Search by Last Name</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <label htmlFor="lastName">Last Name</label>
            <input name="lastName" className="form-control" onChange={this.handleLastNameChange} value={this.state.lastName}></input>

          </Modal.Body>
          <Modal.Footer>
            <Button className="btn btn-primary" type="submit">Submit</Button>
            <Button className="btn btn-primary" onClick={this.handleCancel}>Cancel</Button>

          </Modal.Footer>

        </Modal.Dialog>
      </form>
      </div>
    )
  }
}
