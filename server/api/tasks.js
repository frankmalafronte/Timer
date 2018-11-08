const router = require('express').Router()
const {Task} = require('../db/models')
const {isLoggedIn, isAdmin} = require('./authentication-middleware')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const tasks = await Task.findAll({})
    res.json(tasks)
  } catch (err) {
    next(err)
  }
})

router.post('/', isAdmin, async (req, res, next) => {
  try {
    const newTask = await Task.create(req.body)
    res.status(201).json(newTask)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const oneTask = await Task.findById(req.params.id, {
      include: [{all: true}]
    })
    res.json(oneTask)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', isAdmin, async (req, res, next) => {
  try {
    const id = req.params.id
    await Task.destroy({where: {id}})
    res.status(204).end()
  } catch (err) {
    next(err)
  }
})

router.put('/:id', isAdmin, async (req, res, next) => {
  try {
    const id = req.params.id
    const task = await Task.findById(id)
    res.json(task)
  } catch (err) {
    next(err)
  }
})
