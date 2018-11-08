import React from 'react'
import {Navbar} from './components'
import Routes from './routes'
import Stopwatch from './components/stopwatch'

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <h1>Stopwatch</h1>
        <Stopwatch />
      </div>
    )
  }
}

export default App
