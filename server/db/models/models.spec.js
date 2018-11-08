const {expect} = require('chai')
const db = require('../index')
// const Task = require('./tasks')
const User = require('./user')

const testItem = {
  timeElapsed: 100,
  description: 'this is a test task',
  name: 'name of the task',
  category: 'client 1'
}

const testUser = {
  firstName: 'John',
  lastName: 'Smith',
  email: 'js@google.com',
  password: '123',
  isAdmin: true
}

describe('allModels', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('Task model', () => {
    let testTask
    describe('task schema', () => {
      beforeEach(async () => {
        testTask = await Task.create({testItem})
      })

      xit('all task model values are being inputted correctly', () => {
        expect(testTask.timeElapsed).to.be.equal(testItem.timeElapsed)
        expect(testTask.description).to.be.equal(testItem.description)
        expect(testTask.name).to.be.equal(testItem.name)
        expect(testTask.category).to.be.equal(testItem.category)
      })

      //test to see if each task has a User
      // it('each task belongs to a User', () =>{
      // })
    })
  })

  describe('User Model', () => {
    let dummyUser
    describe('user schema', () => {
      beforeEach(async () => {
        dummyUser = await User.create({testUser})
      })
      xit('all user model values are being inputted correctly', () => {
        expect(dummyUser.firstName).to.be.equal(testUser.firstName)
        expect(dummyUser.lastName).to.be.equal(testUser.lastName)
        expect(dummyUser.email).to.be.equal(testUser.email)
        expect(dummyUser.password).to.be.equal(testUser.password)
        expect(dummyUser.isAdmin).to.be.equal(testUser.isAdmin)
      })
    })
  })
})
