import React, {Component} from 'react'
import {connect} from 'react-redux'
import TimerOn from './TimerOn'
import InputData from './InputData'
import {postTasks, loadTasks, modifyTask} from '../store/tasksReducer'

class Stopwatch extends Component {
  constructor(props) {
    super(props)

    this.state = {
      status: false,
      runningTime: 0,
      currentTask: null
    }
  }

  componentDidMount() {
    this.props.loadTasks()
  }
  handleClick = () => {
    this.setState(state => {
      if (state.status) {
        //Timer has been stopped, User wishes to restart timer and add time to current Task
        this.props.loadTasks()
        let currentTask = this.props.allTasks[this.props.allTasks.length - 1]
        this.props.modifyTask(currentTask.id, {
          timeElapsed: state.runningTime
        })
        clearInterval(this.timer)
      } else {
        //Timer is 0, new task to be created
        if (state.runningTime === 0) {
          this.props.postTasks({})
        }
        const startTime = Date.now() - this.state.runningTime
        this.timer = setInterval(() => {
          this.setState({runningTime: Date.now() - startTime})
        })
      }
      //finally, toggle status
      return {
        status: !state.status
      }
    })
  }
  handleReset = () => {
    this.setState({runningTime: 0, status: false})
  }

  // componentWillUnmount() {
  //     clearInterval(this.timer);
  //   }

  render() {
    return (
      <div>
        <p>{this.state.runningTime}ms </p>

        <button onClick={this.handleClick}>
          {this.state.status ? 'Stop' : 'Start'}
        </button>
        <button onClick={this.handleReset}>Reset</button>
        <div>
          {this.state.status === false && this.state.runningTime > 0 ? (
            <InputData runningTime={this.state.runningTime} />
          ) : (
            <h2 />
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    status: state.status,
    runningTime: state.runningTime,
    allTasks: state.tasksReducer.allTasks
  }
}

const mapDispatchToProps = dispatch => {
  return {
    postTasks: tasks => dispatch(postTasks(tasks)),
    loadTasks: () => dispatch(loadTasks()),
    modifyTask: (id, modifiedTask) => dispatch(modifyTask(id, modifiedTask))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Stopwatch)
