import React from 'react'
import {Navbar} from './components'
import Routes from './routes'
import Stopwatch from './components/Stopwatch'

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <div>
          <Navbar />
        </div>
        <h3>start timer</h3>
        <Stopwatch />
      </div>
    )
  }
}

export default App
