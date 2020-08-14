import React from 'react'

const Persons = ({ persons, remove }) => {
  return (
    <ul>
      {persons.map(p => {
        return (
          <li key={p.id}>
            {p.name} {p.number}{' '}
            <button onClick={() => remove(p.id)}>Delete</button>
          </li>
        )
      })}
    </ul>
  )
}

export default Persons
