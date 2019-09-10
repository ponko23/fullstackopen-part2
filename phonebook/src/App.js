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
      .then(initialPersons => {
        setPersons(initialPersons)
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
    const target = persons.find(person => person.name === newName)
    if(target)
    {
      if(window.confirm(`${target.name} is already added to phonebook, replace the old number with a new one?`)){
        personService
          .update(target.id, {...target, number: newNumber})
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== returnedPerson.id ? person : returnedPerson))
          })
      }
    } else {
      personService
        .create({ name: newName, number: newNumber})
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
        })
      setNewName('')
      setNewNumber('')
    }
  }

  const deletePerson = id => {
    const target = persons.find(person => person.id === id)
    if(window.confirm(`Delete ${target.name} ?`)){
      personService
        .remove(id)
        .then(removedPerson => {
          setPersons(persons.filter(person => person.id !== id))
        })
    }
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

      <Persons showPersons={showPersons} deletePerson={deletePerson}/>
    </div>
  )
}

export default App