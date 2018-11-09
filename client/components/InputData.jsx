import React, {Component} from 'react'
import {postTasks} from '../store/tasksReducer'
import {connect} from 'react-redux'
import {getTaskByID} from '../store/tasksReducer'

class inputData extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      status: false,
      name: '',
      description: '',
      category: ''
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  async handleSubmit(event) {
    event.preventDefault()
    const startTime = await getTaskByID
    this.props.editTask({
      name: this.state.name,
      description: this.state.description,
      category: this.state.category,
      timeElapsed: startTime.createdAt - Date.now()
    })
  }

  render() {
    return (
      <div>
        <h3> Save this Task </h3>
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              onChange={this.handleChange}
              value={this.state.name}
            />
          </label>
          <label>
            Description:
            <input
              type="text"
              name="description"
              onChange={this.handleChange}
              value={this.state.description}
            />
          </label>
          <label>
            Category:
            <input
              type="text"
              name="category"
              onChange={this.handleChange}
              value={this.state.category}
            />
          </label>
          <button onClick={this.handleInput}> Save </button>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getTaskByID: taskId => dispatch(getTaskByID(taskId))
  }
}

export default connect(null, mapDispatchToProps)(inputData)
