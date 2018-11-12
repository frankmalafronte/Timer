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
      category: this.state.category,
      description: this.state.description
    })
  }

  render() {
    return (
      <div>
        <h3> Save this Task </h3>
        <form onSubmit={this.handleSubmit}>
          <label>
            Category:
            <select
              name="category"
              onChange={this.handleChange}
              value={this.state.category}
              required
            >
              <option value="">--</option>
              <option value="Coding">Coding</option>
              <option value="Sleeping">Sleeping</option>
              <option value="Procrastinating">Procrastinating</option>
            </select>
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
