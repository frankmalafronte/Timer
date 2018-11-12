import React, {Component} from 'react'
import Chart from 'react-google-charts'
import {loadTasks} from '../store/tasksReducer'
import {connect} from 'react-redux'

class PieChart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      chartData: []
    }
  }

  async componentDidMount() {
    await this.props.loadTasks()
    console.log(this.props.allTasks)
    //     const categories =
  }
  render() {
    return <h2 />
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
