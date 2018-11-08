const Sequelize = require('sequelize')
const db = require('../db')

const Task = db.define('task', {
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
