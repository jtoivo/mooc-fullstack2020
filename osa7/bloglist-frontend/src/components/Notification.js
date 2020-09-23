import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = () => {
  const message = useSelector(state => state.notification.message)
  const type = useSelector(state => state.notification.type)

  if (!message) {
    return null
  }

  return (
    <Alert variant={type === 'error' ? 'danger' : 'success'}>
      { message}
    </Alert >
  )
}

export default Notification