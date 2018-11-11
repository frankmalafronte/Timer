import React, {Component} from 'react'
import {modifyTask} from '../store/tasksReducer'
import {connect} from 'react-redux'
import {loadTasks, postTasks, removeTasks} from '../store/tasksReducer'
import {Link} from 'react-router-dom'

class inputData extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      status: false,
      name: '',
      description: '',
      category: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDiscard = this.handleDiscard.bind(this)
  }

  componentDidMount() {
    this.props.loadTasks()
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleDiscard(event) {
    event.preventDefault()
    let currentTask = this.props.allTasks[this.props.allTasks.length - 1]
    this.props.removeTasks(currentTask.id)
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.loadTasks()
    let currentTask = this.props.allTasks[this.props.allTasks.length - 1]
    this.props.modifyTask(currentTask.id, {
      name: this.state.name,
      description: this.state.description,
      category: this.state.category
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
          <button type="submit"> Save </button>
        </form>
        <div>
          <button onClick={this.handleDiscard}> Discard </button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    allTasks: state.tasksReducer.allTasks
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadTasks: () => dispatch(loadTasks()),
    modifyTask: (id, modifiedTask) => dispatch(modifyTask(id, modifiedTask)),
    postTasks: tasks => dispatch(postTasks(tasks)),
    removeTasks: id => dispatch(removeTasks(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(inputData)
