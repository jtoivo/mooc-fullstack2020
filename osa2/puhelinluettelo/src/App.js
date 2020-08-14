import React, { useState, useEffect } from 'react'
import personService from './services/personService'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const addPerson = event => {
    event.preventDefault()
    const existing = persons.find(
      p => p.name.toLowerCase() === newName.toLowerCase()
    )
    if (existing !== undefined) {
      if (
        window.confirm(
          `${newName} is already added. Do you want to update the number?`
        )
      ) {
        existing.number = newNumber
        update(existing.id, existing)
        setNewName('')
        setNewNumber('')
      }
    } else if (newName !== '') {
      const newPerson = {
        name: newName,
        number: newNumber,
      }
      personService.create(newPerson).then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
    }
  }

  const remove = id => {
    personService.remove(id).then(() => {
      setPersons(persons.filter(p => p.id !== id))
    })
  }

  const update = (id, changedPerson) => {
    personService.update(id, changedPerson).then(returnedPerson => {
      setPersons(persons.map(p => (p.id !== id ? p : returnedPerson)))
    })
  }

  useEffect(() => {
    personService.getAll().then(initPersons => {
      setPersons(initPersons)
    })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        filter={filter}
        onChange={event => setFilter(event.target.value)}
      />
      <h2>Add</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        onChangeName={event => setNewName(event.target.value)}
        onChangeNum={event => setNewNumber(event.target.value)}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons.filter(person =>
          person.name.toLowerCase().includes(filter.toLowerCase())
        )}
        remove={remove}
      />
    </div>
  )
}

export default App
