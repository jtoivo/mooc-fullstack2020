import loginService from '../services/login'
import blogService from '../services/blogs'
import { setNotification, setErrorMessage } from './notificationReducer'

const loginReducer = (state = null, action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.data.user
    case 'LOGOUT':
      return null
    default:
      return state
  }
}

export const login = (credentials) => {
  return async dispatch => {
    try {
      const user = await loginService.login(credentials)
      blogService.setToken(user.token)
      window.localStorage.setItem('blogAppUser', JSON.stringify(user))
      dispatch({
        type: 'LOGIN',
        data: { user }
      })
      dispatch(setNotification(`Welcome ${user.name}`, 5))
    }
    catch (error) {
      error.message.includes('status code 401')
        ? dispatch(setErrorMessage('Invalid username or password.', 10))
        : dispatch(setErrorMessage('Login failed: ' + error.message, 10))
    }
  }
}

export const checkIfLoggedIn = () => {
  return async dispatch => {
    const loggedUser = window.localStorage.getItem('blogAppUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      blogService.setToken(user.token)
      dispatch({
        type: 'LOGIN',
        data: { user }
      })
    }
  }
}

export const logout = () => {
  window.localStorage.removeItem('blogAppUser')
  return {
    type: 'LOGOUT'
  }
}

export default loginReducer