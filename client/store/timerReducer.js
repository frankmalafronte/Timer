import axios from 'axios'

const initialState = {
  status: false,
  runningTime: 0
}

//ACTIONS
export const GET_TIME = 'GET_TIME'
export const START_TIMER = 'START_TIMER'
export const STOP_TIMER = 'STOP_TIMER'

//ACTION CREATORS

export const getTime = function(TIME) {
  return {
    type: GET_TIME,
    TIME
  }
}

export const startTIMER = function(TASKS) {
  return {
    type: startTIMER,
    TASKS
  }
}

export const STOPTIMER = function(TASKS) {
  return {
    type: STOP_TIMER,
    TASKS
  }
}

//Thunk Creators
export const loadTasks = () => {
  return async dispatch => {
    const res = await axios.get('/api/taskss')
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
