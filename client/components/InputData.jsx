import React, {Component} from 'react'
import {modifyTask} from '../store/tasksReducer'
import {connect} from 'react-redux'
import {findLastTask} from '../store/tasksReducer'
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
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  async handleSubmit(event) {
    event.preventDefault()
    const currentTask = await this.props.findLastTask()
    // console.log(currentTask)
    this.props.modifyTask(currentTask.id, {
      name: this.state.name,
      description: this.state.description,
      category: this.state.category,
      timeElapsed: currentTask.createdAt - Date.now()
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
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    findLastTask: () => dispatch(findLastTask()),
    modifyTask: (id, modifiedTask) => dispatch(modifyTask(id, modifiedTask))
  }
}

export default connect(null, mapDispatchToProps)(inputData)
