import React, { useState, useEffect } from "react";
import axios from "axios";

const Filter = ({ filter, onChange }) => {
  return (
    <div>
      filter with <input value={filter} onChange={onChange} />
    </div>
  );
};

const PersonForm = ({
  addPerson,
  newName,
  newNumber,
  onChangeName,
  onChangeNum,
}) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={onChangeName} />
      </div>
      <div>
        number: <input value={newNumber} onChange={onChangeNum} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Persons = ({ persons }) => {
  return (
    <ul>
      {persons.map((person, i) => {
        return (
          <li key={person.name}>
            {person.name} {person.number}
          </li>
        );
      })}
    </ul>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  const addPerson = (event) => {
    event.preventDefault();
    if (persons.includes(newName)) {
      alert(`${newName} is already added.`);
    } else if (newName !== "") {
      const newPerson = {
        name: newName,
        number: newNumber,
      };
      setPersons(persons.concat(newPerson));
      setNewName("");
      setNewNumber("");
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then((response) => setPersons(response.data));
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        filter={filter}
        onChange={(event) => setFilter(event.target.value)}
      />
      <h2>Add</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        onChangeName={(event) => setNewName(event.target.value)}
        onChangeNum={(event) => setNewNumber(event.target.value)}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons.filter((person) =>
          person.name.toLowerCase().includes(filter.toLowerCase())
        )}
      />
    </div>
  );
};

export default App;
