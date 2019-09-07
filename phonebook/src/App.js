import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchKey, setSearchKey ] = useState('')

  const showPersons = persons.filter(person => {
    if(searchKey === '') return true
    console.log(person.name.toLowerCase(), searchKey.toLowerCase())
    return person.name.toLowerCase().indexOf(searchKey.toLowerCase()) != -1
  })

  const handleNewNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchKeyChange = (event) => {
    setSearchKey(event.target.value)

  }

  const addPerson = (event) => {
    event.preventDefault()
    if(persons.find(person => person.name === newName))
    {
      debugger
      alert(`${newName} is already added to phonebook`)
      return
    }
    setPersons(persons.concat({ name: newName, number: newNumber}))
    setNewName('')
    setNewNumber('')
  }

  const rows = () =>
    showPersons.map(person => <p key={person.name}>{person.name} {person.number}</p>)

  return (
    <div>
      <h2>Phonebook</h2>
      <p>filter show with <input value={searchKey} onChange={handleSearchKeyChange} /></p>
      <h2>add a new</h2>
      <form  onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNewNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNewNumberChange} />
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