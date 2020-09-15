const reducer = (state = '', action) => {
  console.log('action', action)

  switch (action.type) {
    case 'SET':
      return action.data
    case 'CLEAR':
      return ''
    default:
      return ''
  }
}

export const setNotification = (message) => {
  return {
    type: 'SET',
    data: { message }
  }
}

export const clearNotification = () => {
  return {
    type: 'CLEAR'
  }
}

export default reducer