const Sequelize = require('sequelize')
const db = require('../db')

const Task = db.define('tasks', {
  timeElapsed: {
    type: Sequelize.INTEGER
  },
  description: {
    type: Sequelize.STRING
  },
  category: {
    type: Sequelize.STRING
  }
  // timeStamp: {
  //   type: Sequelize.BIGINT
  // }
})

// Task.hook('beforeValidate', tasks => {
//   tasks.name = tasks.name.charAt(0).toUpperCase() + tasks.name.slice(1)
// })

module.exports = Task
