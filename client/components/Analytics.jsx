import React, {Component} from 'react'
import {connect} from 'react-redux'
import Chart from 'react-google-charts'
import {loadTasks} from '../store/tasksReducer'
import Table from './Table'
import PieChart from './PieChart'
class Analytics extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  //   componentDidMount() {
  //     this.props.loadTasks()
  //   }

  render() {
    return (
      <div>
        <Table />
        <PieChart />
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
    loadTasks: () => dispatch(loadTasks())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Analytics)
