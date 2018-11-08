const Sequelize = require('sequelize')
const db = require('../db')

const Task = db.define('tasks', {
  timeElapsed: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  category: {
    type: Sequelize.STRING
  }
})

Task.hook('beforeValidate', tasks => {
  tasks.name = tasks.name.charAt(0).toUpperCase() + tasks.name.slice(1)
})

module.exports = Task
