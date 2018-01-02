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
        <h3>Note that this largely done, other than testing. Some CSS touches may be helpful as well (positioning of modal windows and buttonss. </h3>
        <h3>Please note that if the list of employees is empty, you will need to run "npm run seed" from the command line.</h3>
        {this.props.children}
      </div>
    )
  }
}
