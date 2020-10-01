import React from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Recommendations = props => {
  const result = useQuery(ALL_BOOKS, {
    fetchPolicy: 'no-cache',
    skip: !props.user,
    variables: { genreToSearch: props.user ? props.user.favoriteGenre : '' },
  })

  if (!props.show || !props.user) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  return (
    <table>
      <tbody>
        <tr>
          <th>title</th>
          <th>author</th>
          <th>published</th>
        </tr>
        {result.data.allBooks.map(a => (
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
