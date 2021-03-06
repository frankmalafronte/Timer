const router = require('express').Router()
const Task = require('../db/models/tasks')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const tasks = await Task.findAll({})
    res.json(tasks)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
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

router.get('/latest', async (req, res, next) => {
  try {
    const tasks = await Task.findOne({
      limit: 1,
      where: {},
      order: [['createdAt', 'DESC']]
    })
    res.json(task)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    await Task.destroy({where: {id}})
    res.status(204).end()
  } catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const task = await Task.findById(id)
    const modifiedTask = await task.update(req.body)
    res.json(modifiedTask)
  } catch (err) {
    next(err)
  }
})
