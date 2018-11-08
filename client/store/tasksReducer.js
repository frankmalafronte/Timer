import axios from 'axios'

const initialState = {
  allTasks: []
}

//ACTIONS
export const GOT_TASKS = 'GOT_Tasks'
export const ADD_TASKS = 'ADD_TASKS'
export const EDIT_TASK = 'EDIT_TASK'
export const REMOVE_TASKS = 'REMOVE_TASKS'

//ACTION CREATORS

export const gotTASKS = function(TASKS) {
  return {
    type: GOT_TASKS,
    TASKS
  }
}

export const addTASKS = function(TASKS) {
  return {
    type: ADD_TASKS,
    TASKS
  }
}

export const editTASK = function(TASKS) {
  return {
    type: EDIT_TASK,
    TASKS
  }
}

export const deleteTASK = TASKId => ({
  type: REMOVE_TASKS,
  TASKId
})

//Thunk Creators
export const loadTasks = () => {
  return async dispatch => {
    const res = await axios.get('/api/tasls')
    dispatch(gotTasks(res.data))
  }
}
export const postTasks = task => {
  return async dispatch => {
    const {data} = await axios.post('/api/tasks', task)
    dispatch(addTask(data))
  }
}

export const editedTasks = (id, modifiedhat) => {
  return async dispatch => {
    const res = await axios.put(`/api/tasks/${id}`, modifiedtask)
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

//REDUCERS
export function tasksReducer(state = initialState, action) {
  switch (action.type) {
    case GOT_TASKS:
      return {
        ...state,
        allTASKS: action.TASKS
      }
    case ADD_TASKS:
      return {
        ...state,
        allTASKS: [...state.allTASKS, action.TASKS]
      }
    case EDIT_TASK:
      return {
        ...state,
        allTASKS: [
          ...state.allTASKS.filter(task => task.id !== action.taskId),
          action.TASKS
        ]
      }
    case REMOVE_TASKS:
      return {
        ...state,
        allTASKS: [...state.allTASKS.filter(task => task.id !== action.taskId)]
      }
    default:
      return initialState
  }
}

export default tasksReducer
