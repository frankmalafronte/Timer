import React, {Component} from 'react'
import {connect} from 'react-redux'

class TimerOn extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <div>
        <p> {this.state.runningTime}</p>
        <button onClick={this.handleClick}> stop </button>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(null, mapDispatchToProps)(TimerOn)
