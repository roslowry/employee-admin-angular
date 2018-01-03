import React from 'react';
import store from '../store';
import Navbar from '../components/Navbar'

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
    return (
      <div>
        <Navbar />
        {this.props.children}
      </div>
    )
  }
}
