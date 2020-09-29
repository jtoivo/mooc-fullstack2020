import { useApolloClient } from '@apollo/client'
import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import LoginForm from './components/LoginForm'
import NewBook from './components/NewBook'
import Recommendations from './components/Recommendations'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [errorMessage, setError] = useState('')
  const client = useApolloClient()

  useEffect(() => {
    const token = localStorage.getItem('library-user-token')
    if (token) {
      setToken(token)
    }
  }, [])

  const errorStyle = {
    color: 'red',
    display: errorMessage ? '' : 'none',
    marginBottom: 20,
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div style={errorStyle}>
        {errorMessage}
        <button onClick={() => setError('')}>ok</button>
      </div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button
          style={{ display: token ? '' : 'none' }}
          onClick={() => setPage('add')}
        >
          add book
        </button>
        <button
          style={{ display: token ? '' : 'none' }}
          onClick={() => setPage('recommendations')}
        >
          recommend
        </button>
        <button
          style={{ display: !token ? '' : 'none' }}
          onClick={() => setPage('login')}
        >
          login
        </button>
        <button
          style={{ display: token ? '' : 'none' }}
          onClick={() => logout()}
        >
          logout
        </button>
      </div>
      <Authors
        show={page === 'authors'}
        setError={setError}
        loggedIn={token ? true : false}
      />
      <Books show={page === 'books'} setError={setError} />
      <NewBook show={page === 'add'} setError={setError} />
      <Recommendations
        show={page === 'recommendations'}
        setError={setError}
        setPage={setPage}
      />
      <LoginForm
        show={page === 'login'}
        setError={setError}
        setToken={setToken}
        setPage={setPage}
      />
    </div>
  )
}

export default App
