import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Countries from './components/Countries'

const App = () => {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then(response => {
      setCountries(response.data)
    })
  }, [])

  const filtered = countries.filter(c =>
    c.name.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div>
      Find countries{' '}
      <input value={filter} onChange={event => setFilter(event.target.value)} />
      <Countries
        filter={filter}
        filtered={filtered}
        btnHandler={name => setFilter(name)}
      />
    </div>
  )
}

export default App
