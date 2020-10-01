import React from 'react'
import { useQuery } from '@apollo/client'
import { useMutation } from '@apollo/client'
import { ALL_AUTHORS, UPDATE_AUTHOR } from '../queries'

const Authors = props => {
  const [updateAuthor] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })
  const result = useQuery(ALL_AUTHORS)

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  const authors = result.data.allAuthors ? result.data.allAuthors : []

  const update = async e => {
    e.preventDefault()
    const name = e.target.name.value
    const year = e.target.year.value
    if (name && Number.isInteger(Number(year))) {
      try {
        await updateAuthor({ variables: { name, year: Number(year) } })
      } catch (error) {
        props.showError(error.message)
      }
    }
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th>name</th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map(a => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ display: props.loggedIn ? '' : 'none' }}>
        <h3>Set birthyear</h3>
        <form onSubmit={update}>
          <select name='name'>
            {authors.map(a => {
              return <option key={a.name}>{a.name}</option>
            })}
          </select>
          <div>
            year<input name='year'></input>
          </div>
          <button>update</button>
        </form>
      </div>
    </div>
  )
}

export default Authors
