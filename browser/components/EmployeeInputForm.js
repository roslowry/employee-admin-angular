import React from 'react';
import { states } from '../../utils';
import { Modal, Button, ButtonToolbar } from 'react-bootstrap'

// const modalInstance = (
//   <div className="static-modal">
//     <Modal.Dialog>
//       <Modal.Header>
//         <Modal.Title>Modal title</Modal.Title>
//       </Modal.Header>
//
//       <Modal.Body>
//         One fine body...
//       </Modal.Body>
//
//       <Modal.Footer>
//         <Button>Close</Button>
//         <Button bsStyle="primary">Save changes</Button>
//       </Modal.Footer>
//
//     </Modal.Dialog>
//   </div>
// );


export default class extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      validateStatus: '',
      validateMessage: ''
    }
  }

  checkCase(word){
    return word[0].toUpperCase() + word.slice(1)
  }

  componentWillReceiveProps(nextProps){
    console.log('next props', nextProps)
    this.setState({
      validateStatus: nextProps.validateStatus,
      validateMessage: nextProps.validateMessage
    })
  }

  render(){
    console.log(
      'props.validate message', this.props.validateMessage

    )
    console.log('props are', this.props)
  return (

    <div className="static-modal">
      <form className="form-group" onSubmit={this.props.handleSubmit}>
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>{this.props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <label htmlFor="firstName"><small>First Name</small><span style={{color: "red"}}>*</span></label>
            <input className="form-control" name="firstName" type="text" onChange={this.props.handleInputChange} value={this.props.firstName && this.checkCase(this.props.firstName)} maxLength="20"/>
            <label htmlFor="lastName"><small>Last Name</small><span style={{color: "red"}}>*</span></label>
            <input className="form-control" name="lastName" type="text" value={this.props.lastName && this.checkCase(this.props.lastName)} onChange={this.props.handleInputChange} maxLength="20"></input>
            <label htmlFor="middleInitial"><small>Middle Initial</small></label>
            <input className="form-control" name="middleInitial" maxLength="1" type="text" onChange={this.props.handleInputChange} value={this.props.middleInitial && this.checkCase(this.props.middleInitial)}></input>
            <label htmlFor="emailAddress"><small>Email Address</small><span style={{color: "red"}}>*</span></label>
            <input className="form-control" name="emailAddress" type="text "value={this.props.emailAddress} onChange={this.props.handleInputChange} ></input>
            <label htmlFor="phoneNumber"><small>Phone Number</small></label>
            <input
              className="form-control"
              name="phoneNumber"
              onChange={this.props.handlePhoneChange}
              value={this.props.numIncreasingInSize ? this.props.phoneNumberWithDashes(this.props.phoneNumber) : this.props.phoneNumber}
              >
            </input>
            <label htmlFor="positionCategory"><small>Position Category</small></label>
            <select name="positionCategory" onChange={this.props.handleInputChange} value={this.props.positionCategory}
            className="form-control"
              >
              <option value="Indirect">Indirect</option>
              <option value="Direct">Direct</option>
              <option value="Program Manager">Program Manager</option>
              <option value="Director">Director</option>
              <option value="Executive">Executive</option>
            </select>
            <label htmlFor="date"><small>Date Hired</small><span style={{color: "red"}}>*</span></label>
            <input className="form-control" type="date" name="dateHired" onChange={this.props.handleInputChange} value={this.props.convertDate(this.props.dateHired)}></input>
            <label htmlFor="address1" ><small>Address 1</small></label>
            <input className="form-control" name="address1" type="text" onChange={this.props.handleInputChange} value={this.props.address1}></input>
            <label htmlFor="address2" ><small>Address 2</small></label>
            <input className="form-control" name="address2" type="text" onChange={this.props.handleInputChange} value={this.props.address2}></input>
            <label htmlFor="city" ><small>City</small></label>
            <input className="form-control" name="city" type="text" onChange={this.props.handleInputChange} value={this.props.city}></input>
            <label htmlFor="state"><small>State</small></label>
            <select className="form-control" value={this.props.state} name="state" onChange={this.props.handleInputChange}>
              {states.map((state, index) => {
                return <option  key={index} value={state}>{state}</option>
              })}
            </select>
            <label htmlFor="zipcode"><small>Zip Code</small></label>
            <input className="form-control" name="zipcode" type="text" value={this.props.zipcode} onChange={this.props.handleInputChange} ></input>
            <label htmlFor="active"><small>Active</small><span style={{color: "red"}}>*</span></label>
            <select className="form-control" name="active" value={this.props.active} onChange={this.props.handleInputChange}>
              <option value={true}>True</option>
              <option value={false}>False</option>
            </select>
        </Modal.Body>
        <Modal.Footer>
          <ButtonToolbar>

            <Button type="submit" onSubmit={this.props.handleSubmit}>Submit</Button>
            <Button onClick={this.props.handleClearForm}>Cancel</Button>
            {!this.state.validateStatus ? (
              <div>
                <small style={{color: "red"}}>{this.state.validateMessage}</small>
              </div>

            ) : null}
        </ButtonToolbar>
        </Modal.Footer>
      </Modal.Dialog>
    </form>

    </div>
  )
  }
}
