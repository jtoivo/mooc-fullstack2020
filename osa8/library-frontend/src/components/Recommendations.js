import React, { useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { ALL_BOOKS, ME } from '../queries'

const Recommendations = props => {
  const meResult = useQuery(ME)
  const [getBooks, booksResult] = useLazyQuery(ALL_BOOKS)

  useEffect(() => {
    if (meResult.data && meResult.data.me) {
      getBooks({ variables: { genreToSearch: meResult.data.me.favoriteGenre } })
    }
  }, [meResult.data, getBooks])

  if (!props.show) {
    return null
  }

  if (meResult.loading || !booksResult.data) {
    return <div>loading...</div>
  }

  return (
    <table>
      <tbody>
        <tr>
          <th></th>
          <th>author</th>
          <th>published</th>
        </tr>
        {booksResult.data.allBooks.map(a => (
          <tr key={a.title}>
            <td>{a.title}</td>
            <td>{a.author.name}</td>
            <td>{a.published}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Recommendations
