import { useApolloClient } from '@apollo/client'
import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import LoginForm from './components/LoginForm'
import NewBook from './components/NewBook'
import Recommendations from './components/Recommendations'

const App = () => {
  const [page, setPage] = useState('authors')
  const [user, setUser] = useState(null)
  const [errorMessage, setError] = useState('')
  const client = useApolloClient()

  useEffect(() => {
    const loggedUser = localStorage.getItem('library-user')
    if (loggedUser) {
      setUser(JSON.parse(loggedUser))
    }
  }, [])

  const errorStyle = {
    color: 'red',
    display: errorMessage ? '' : 'none',
    marginBottom: 20,
  }

  const logout = () => {
    setUser(null)
    localStorage.clear()
    client.resetStore()
  }

  const showError = message => {
    setError(message)
    setTimeout(() => {
      setError('')
    }, 10000)
  }

  return (
    <div>
      <div style={errorStyle}>{errorMessage}</div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button
          style={{ display: user ? '' : 'none' }}
          onClick={() => setPage('add')}
        >
          add book
        </button>
        <button
          style={{ display: user ? '' : 'none' }}
          onClick={() => setPage('recommendations')}
        >
          recommend
        </button>
        <button
          style={{ display: !user ? '' : 'none' }}
          onClick={() => setPage('login')}
        >
          login
        </button>
        <button
          style={{ display: user ? '' : 'none' }}
          onClick={() => logout()}
        >
          logout
        </button>
      </div>
      <Authors
        show={page === 'authors'}
        showError={showError}
        loggedIn={user ? true : false}
      />
      <Books show={page === 'books'} showError={showError} />
      <NewBook show={page === 'add'} showError={showError} />
      <Recommendations
        show={page === 'recommendations'}
        showError={showError}
        setPage={setPage}
        user={user}
      />
      <LoginForm
        show={page === 'login'}
        showError={showError}
        setUser={setUser}
        setPage={setPage}
      />
    </div>
  )
}

export default App
