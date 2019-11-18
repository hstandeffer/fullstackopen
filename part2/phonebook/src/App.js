import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Numbers from './components/Numbers'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ search, setSearch ] = useState('')
  const [ message, setMessage ] = useState(null)
  const [ errorMessage, setErrorMessage ] = useState(null)

  useEffect(() => {
    personService
      .getPersons()
      .then(returnedPersons => {
        setPersons(returnedPersons)
    })
  }, [])

  const addName = event => {
    event.preventDefault()
    if (persons.some(person => person.name === newName)) {
      if (window.confirm(`${newName} is already added to the phonebook, replace old number with new one?`)) {
        const newPerson = {
          name: newName,
          number: newNumber
        }

        const id = persons.find(person => person.name === newPerson.name).id

        personService
          .update(id, newPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            setErrorMessage(`Person with id ${id} has been removed on the server.`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
            setPersons(persons.filter(person => person.id !== id))
          })
      }
    }
    else {
      const newPerson = {
        name: newName,
        number: newNumber
      }

      personService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setMessage(`Added ${returnedPerson.name}`)
          setTimeout(() => {
            setMessage(null)
          }, 5000);
        })
    }
  }

  const deleteName = id => {
    if (window.confirm(`Are you sure you want to delete the person with id ${id}?`)) {
      personService
        .deletePerson(id)
        .then(setPersons(persons.filter(person => person.id !== id)))
    }
  }

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(search))

  const handleNameChange = event => {
    setNewName(event.target.value)
  }

  const handleNumberChange = event => {
    setNewNumber(event.target.value)
  }

  const handleSearch = event => {
    setSearch(event.target.value.toLowerCase())
  }

  return (
    <div>
      <h2>Phonebook</h2>
      
      <Notification message={message} errorMessage={errorMessage} />

      <Filter
        handleSearch={handleSearch}
      />
      <h2>Add New</h2>

      <PersonForm
        addName={addName}
        handleNameChange={handleNameChange}
        newName={newName}
        handleNumberChange={handleNumberChange}
        newNumber={newNumber}
      />

      <h2>Numbers</h2>
      <Numbers personsToShow={personsToShow} deleteName={deleteName} />
    </div>
  )
}

export default App