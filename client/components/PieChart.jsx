import React, {Component} from 'react'
import Chart from 'react-google-charts'
import {loadTasks} from '../store/tasksReducer'
import {connect} from 'react-redux'

class PieChart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      chartData: null
    }
  }

  setDataToState = () => {
    let output = {
      Coding: 0,
      Sleeping: 0,
      Procrastinating: 0
    }
    let realOutput = [['Task', 'Minutes Spent']]
    this.props.allTasks.map(
      el => (output[el.category] += el.timeElapsed / 12000000)
    )
    for (let key in output) {
      realOutput.push([key, output[key]])
    }
    this.setState({chartData: realOutput})
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
        chartType="PieChart"
        // loader={<div>Loading Chart</div>}
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

export default connect(mapState, mapDispatch)(PieChart)
