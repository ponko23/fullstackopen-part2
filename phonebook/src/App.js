import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const handleNewNameChange = (event) => {
    setNewName(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    setPersons(persons.concat({ name: newName}))
    setNewName('')
  }

  const rows = () =>
    persons.map(person => <p key={person.name}>{person.name}</p>)

  return (
    <div>
      <h2>Phonebook</h2>
      <form  onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNewNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        {rows()}
      ...
    </div>
  )
}

export default App