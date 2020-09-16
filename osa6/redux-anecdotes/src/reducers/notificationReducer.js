const defaultNotification = { message: '', timeoutId: null }

const notificationReducer = (state = defaultNotification, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      if (state.timeoutId) {
        clearTimeout(state.timeoutId)
      }
      return {
        message: action.data.message,
        timeoutId: action.data.timeoutId
      }
    case 'CLEAR_NOTIFICATION':
      return defaultNotification
    default:
      return state
  }
}

export const setNotification = (message, seconds) => {
  return async (dispatch) => {
    const timeoutId = setTimeout(() => {
      dispatch({ type: 'CLEAR_NOTIFICATION' })
    }, seconds * 1000)
    dispatch({
      type: 'SET_NOTIFICATION',
      data: { message, timeoutId }
    })
  }
}

export default notificationReducer