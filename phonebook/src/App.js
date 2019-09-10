import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchKey, setSearchKey ] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialNotes => {
        setPersons(initialNotes)
      })
  }, [])

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
    personService
      .create({ name: newName, number: newNumber})
      .then(returnedNote => {
        setPersons(persons.concat(returnedNote))
      })
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter
        searchKey={searchKey}
        handleSearchKeyChange={handleSearchKeyChange}
      />

      <h3>add a new</h3>

      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNewNameChange={handleNewNameChange}
        newNumber={newNumber}
        handleNewNumberChange={handleNewNumberChange}
      />

      <h3>Numbers</h3>

      <Persons showPersons={showPersons}/>
    </div>
  )
}

export default App