import axios from 'axios'

const initialState = {
  allTasks: []
}

//ACTIONS
export const GET_TASKS = 'GET_TASKS'
export const ADD_TASKS = 'ADD_TASKS'
export const EDIT_TASK = 'EDIT_TASK'
export const REMOVE_TASKS = 'REMOVE_TASKS'
export const GET_SINGLE_TASK = 'GET_SINGLE_TASK'
export const GET_LATEST_TASK = 'GET_LATEST_TASK'

//ACTION CREATORS

export const getTasks = function(TASKS) {
  return {
    type: GET_TASKS,
    TASKS
  }
}

export const getSingleTask = function(TASKS) {
  return {
    type: GET_SINGLE_TASK,
    TASKS
  }
}

export const addTasks = function(TASKS) {
  return {
    type: ADD_TASKS,
    TASKS
  }
}

export const editTask = function(TASKS) {
  return {
    type: EDIT_TASK,
    TASKS
  }
}

export const deleteTask = function(taskId) {
  return {
    type: REMOVE_TASKS,
    taskId
  }
}

export const getLatestTask = function(TASKS) {
  return {
    type: GET_LATEST_TASK,
    TASKS
  }
}

//Thunk Creators
export const loadTasks = () => {
  return async dispatch => {
    const res = await axios.get('/api/tasks')
    dispatch(getTasks(res.data))
  }
}

export const getTaskByID = () => {
  return async dispatch => {
    const res = await axios.get(`/api/tasks/${id}`)
    dispatch(getSingleTask(res.data))
  }
}

export const postTasks = task => {
  return async dispatch => {
    const {data} = await axios.post('/api/tasks', task)
    dispatch(addTasks(data))
  }
}

export const modifyTask = (id, modifiedTask) => {
  return async dispatch => {
    const res = await axios.put(`/api/tasks/${id}`, modifiedTask)
    dispatch(editTask(res.data))
  }
}

export const removeTasks = id => {
  return async dispatch => {
    try {
      await axios.delete(`/api/tasks/${id}`)
      dispatch(deleteTask(id))
    } catch (err) {
      console.error(err)
    }
  }
}

export const findLastTask = () => {
  return async dispatch => {
    const res = await axios.get('/api/tasks/latest')
    dispatch(getLatestTask(res.data))
  }
}
//REDUCERS
export function tasksReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TASKS:
      return {
        ...state,
        allTasks: action.TASKS
      }
    case GET_SINGLE_TASK:
      return {
        ...state,
        allTasks: [...state.allTasks.filter(task => task.id !== action.taskId)]
      }
    case ADD_TASKS:
      return {
        ...state,
        allTasks: [...state.allTasks, action.Tasks]
      }
    case EDIT_TASK:
      return {
        ...state,
        allTasks: [
          ...state.allTasks.filter(task => task.id !== action.taskId),
          action.Tasks
        ]
      }
    case REMOVE_TASKS:
      return {
        ...state,
        allTasks: [...state.allTasks.filter(task => task.id !== action.taskId)]
      }
    default:
      return initialState

    case GET_LATEST_TASK:
      return {
        ...state,
        allTasks: [...state.allTasks.filter(task => task.id !== action.taskId)]
      }
  }
}

export default tasksReducer
