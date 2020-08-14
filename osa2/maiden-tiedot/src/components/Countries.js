import React from 'react'
import Weather from './Weather'

const Countries = ({ filter, filtered, btnHandler }) => {
  if (filter.length === 0 || filtered.length === 0) {
    return <p></p>
  } else if (filtered.length > 10) {
    return <div>Too many matches.</div>
  } else if (filtered.length > 1) {
    return (
      <ul>
        {filtered.map(c => (
          <CountryItem
            key={c.numericCode}
            name={c.name}
            btnHandler={btnHandler}
          />
        ))}
      </ul>
    )
  } else if (filtered.length === 1) {
    return <CountryInfo country={filtered[0]} />
  }
}

const CountryItem = ({ name, btnHandler }) => {
  return (
    <li>
      {name}
      <button onClick={() => btnHandler(name)}>show</button>
    </li>
  )
}

const CountryInfo = ({ country }) => {
  return (
    <div>
      <h1>{country.name}</h1>
      <p>Capital {country.capital}</p>
      <p>Population {country.population}</p>
      <h2>Languages</h2>
      <ul>
        {country.languages.map(l => (
          <li key={l.iso639_1}>{l.name}</li>
        ))}
      </ul>
      <div>
        <img alt={country.name} src={country.flag} />
      </div>
      <Weather country={country} />
    </div>
  )
}

export default Countries
