import React, { useState, useEffect } from 'react'
import axios from 'axios'
import personsHandleService from './services/persons'
import Button from './components/Button'
import Person from './components/Person'
import SuccessfulMessage from './components/SuccessfulMessage'
import ErrorMessage from './components/ErrorMessage'

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [successfulMessage, setSuccessfulMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() =>{
    axios.get("http://localhost:3001/persons").then(response => setPersons(response.data))
  },[])
  
  const addName = (event) => {
    event.preventDefault()
    const list_of_names = persons.map(person => person.name)
    if(list_of_names.includes(newName)){
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        const person_to_update = persons.filter(person => person.name.includes(newName))
        if(person_to_update.length > 0) {
          personsHandleService.updateNumber(person_to_update[0], newNumber).then(response =>{
            updateAllPersons()
            setSuccessfulMessage(`${newName} has been edited`)
            setTimeout(() => setSuccessfulMessage(null), 5000)
          }).catch(error => {
            console.log("error was ", error)
            setErrorMessage(`Information of ${newName} has already been removed from server`)
            setTimeout(() =>setErrorMessage(null), 5000)
          })
        }
        setNewName("")
        setNewNumber("") 
      }

    } else {
      const personObj = {
        name: newName,
        number: newNumber
      }

      personsHandleService.addPerson(personObj).then(response => {
        setPersons(persons.concat(response))
        setSuccessfulMessage(`Added ${newName}`)
        setTimeout(() => setSuccessfulMessage(null), 5000)
      }).catch(error => {
        setErrorMessage(`Failed to add ${newName}`)
        setTimeout(() =>setErrorMessage(null), 5000)
      })
      setNewName("")
      setNewNumber("")
    }
  }

  const handleNameChange = (event) =>{
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const deletePerson = (event) => {
    const person_to_delete = personsHandleService.getSinglePerson(event.target.value)
    person_to_delete.then(repsonse =>{ 
      if(window.confirm(`Delete ${repsonse.name} ?`)){
        personsHandleService.deletePerson(event.target.value).then( resp =>{
          updateAllPersons()
          setSuccessfulMessage(`Delete successful`)
          setTimeout(() => setSuccessfulMessage(null), 5000)
        }).catch(error => {
          setErrorMessage(`Data not found from server`)
          setTimeout(() =>setErrorMessage(null), 5000)
        })
      }
    })
  }

  const updateAllPersons = () => {
    personsHandleService.getAllPersons().then(response =>{
      setPersons(response)
    })

  }

  const filter_result = persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <SuccessfulMessage message={successfulMessage} />
      <ErrorMessage message={errorMessage} />
      <div>filter shown with <input value={newFilter} onChange={handleFilterChange}></input></div>
      <h2>add a new</h2>
      <form onSubmit={addName}>
        <div> name: <input value={newName} onChange={handleNameChange}/> </div>
        <div> number: <input value={newNumber} onChange={handleNumberChange}/> </div>
        <div> <button type="submit">add</button> </div>
      </form>
      <h2>Numbers</h2>
      {filter_result.map(person => 
        <Person key={person.name} person={person} button={<Button person={person} text="delete" buttonFunction={deletePerson}/>} />)}
    </div>
  )

}

export default App
