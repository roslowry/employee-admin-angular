import React from 'react';
import store from '../store';

export default class extends React.Component {

  constructor(props){
    super(props)
    this.state = store.getState();
  }

  componentDidMount(){
    this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState())
    })
  }

  componentWillUnmount(){
    store.unsubscribe()
  }

  render() {
    console.log('state in app container is', this.state);
    console.log('props in app container are', this.props)
    return (
      <div>
        <h1>Employee List - Draft</h1>
        <h3>Note that this is a work-in progress, and a few enhancements (styling, validations, and refactoring) and additions (testing) are under way.</h3>
        <h3>Also, please note that if the list of employees is empty, you will need to run "npm run seed" from the command line.</h3>

        {this.props.children}
      </div>
    )
  }
}
