const notificationReducer = (state = { message: '', type: 'info' }, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data
    case 'CLEAR_NOTIFICATION':
      return ''
    default:
      return state
  }
}

let timeoutId

export const setNotification = (message, seconds) => {
  return async (dispatch) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => {
      dispatch({ type: 'CLEAR_NOTIFICATION' })
    }, seconds * 1000)
    dispatch({
      type: 'SET_NOTIFICATION',
      data: { message, type: 'info' }
    })
  }
}

export const setErrorMessage = (message, seconds) => {
  return async (dispatch) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => {
      dispatch({ type: 'CLEAR_NOTIFICATION' })
    }, seconds * 1000)
    dispatch({
      type: 'SET_NOTIFICATION',
      data: { message, type: 'error' }
    })
  }
}

export default notificationReducer