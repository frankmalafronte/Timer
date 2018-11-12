import React, {Component} from 'react'
import {connect} from 'react-redux'
import Chart from 'react-google-charts'
import {loadTasks} from '../store/tasksReducer'

class Analytics extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.props.loadTasks()
  }

  render() {
    return (
      <Chart
        width="500px"
        height="300px"
        chartType="Table"
        loader={<div>Loading Chart</div>}
        data={
          ([
            {type: 'string', label: 'Category'},
            {type: 'number', label: 'Time'}
          ],
          this.props.allTasks.map(el => [el.category, el.timeElapsed]))
        }
        options={{
          title: '',
          // Just add this option
          is3D: true
        }}
        rootProps={{'data-testid': '2'}}
      />
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
