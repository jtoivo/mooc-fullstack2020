const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':


      return action.message
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
      message
    })
  }
}

export default notificationReducer