import React, { useEffect, useState } from 'react'
import { useLazyQuery, useQuery } from '@apollo/client'
import { ALL_BOOKS, ALL_GENRES } from '../queries'

const Books = props => {
  const [books, setBooks] = useState([])
  const [genre, setGenre] = useState('')
  const genresResult = useQuery(ALL_GENRES)
  const [getBooks, result] = useLazyQuery(ALL_BOOKS)

  const showBooks = clickedGenre => {
    clickedGenre
      ? getBooks({ variables: { genreToSearch: clickedGenre } })
      : getBooks()
    setGenre(clickedGenre)
  }

  useEffect(() => {
    if (result.data) {
      setBooks(result.data.allBooks)
    }
  }, [result])

  if (!props.show) {
    return null
  }

  if (genresResult.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>Books</h2>
      {genre ? <h3>about {genre}</h3> : ''}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map(a => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genresResult.data.allGenres.map(g => (
        <button key={g} onClick={() => showBooks(g)}>
          {g}
        </button>
      ))}
      <button onClick={() => showBooks('')}>all genres</button>
    </div>
  )
}

export default Books
