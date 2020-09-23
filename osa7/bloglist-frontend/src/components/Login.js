import React from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/loginReducer'
import { Form, Button, FormGroup, FormLabel } from 'react-bootstrap'

const Login = () => {

  const dispatch = useDispatch()

  const handleLogin = (e) => {
    e.preventDefault()
    dispatch(login({
      username: e.target.username.value,
      password: e.target.password.value
    }))
    e.target.username.value = ''
    e.target.password.value = ''
  }

  return (
    <div className="container">
      <h2>Login</h2>
      <Form onSubmit={handleLogin}>
        <FormGroup>
          <FormLabel>username</FormLabel>
          <Form.Control
            type="text"
            name="username"
          />
          <FormLabel>password</FormLabel>
          <Form.Control
            type="password"
            name="password"
          />
          <Button variant='primary' type="submit">login</Button>
        </FormGroup></Form>
    </div>)
}

export default Login