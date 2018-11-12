import React, {Component} from 'react'
import Chart from 'react-google-charts'
import {loadTasks} from '../store/tasksReducer'
import {connect} from 'react-redux'

class Table extends Component {
  constructor(props) {
    super(props)
    this.state = {
      chartData: null
    }
  }

  setDataToState = () => {
    let categories = [
      {type: 'string', label: 'Category'},
      {type: 'number', label: 'Minutes Spent'}
    ]
    let output = [categories]
    this.props.allTasks.map(el =>
      output.push([el.category, Math.round(el.timeElapsed / 60000)])
    )
    console.log(output)
    this.setState({chartData: output})
  }

  async componentDidMount() {
    await this.props.loadTasks()
    this.setDataToState()
  }
  render() {
    return (
      <Chart
        width="500px"
        height="300px"
        chartType="Table"
        data={this.state.chartData}
      />
    )
  }
}

const mapState = state => {
  return {
    allTasks: state.tasksReducer.allTasks
  }
}
const mapDispatch = dispatch => {
  return {
    loadTasks: () => dispatch(loadTasks())
  }
}

export default connect(mapState, mapDispatch)(Table)
