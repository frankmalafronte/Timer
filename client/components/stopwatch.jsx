import React, {Component} from 'react'
import {connect} from 'react-redux'
import TimerOn from './TimerOn'
import InputData from './InputData'

class Stopwatch extends Component {
  constructor(props) {
    super(props)

    this.state = {
      status: false,
      runningTime: 0
    }
  }
  handleClick = () => {
    this.setState(state => {
      if (state.status) {
        clearInterval(this.timer)
      } else {
        const startTime = Date.now() - this.state.runningTime
        this.timer = setInterval(() => {
          this.setState({runningTime: Date.now() - startTime})
        })
      }
      return {status: !state.status}
    })
  }
  handleReset = () => {
    this.setState({runningTime: 0, status: false})
  }

  // //clears when we dismount?
  //   componentWillUnmount() {
  //       clearInterval(this.timer);
  //     }

  render() {
    return (
      <div>
        <p>{this.state.runningTime}ms </p>
        {this.state.status ? (
          <TimerOn runningtime={this.state.runningTime} />
        ) : (
          <button onClick={this.handleClick}>start</button>
        )}

        <InputData runningTime={this.state.runningTime} />

        <button onClick={this.handleReset}>Reset</button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    status: state.status,
    runningTimer: state.runningTime
  }
}

export default connect(mapStateToProps)(Stopwatch)
