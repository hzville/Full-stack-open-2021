import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Person from './components/Person'
import Filter from './components/Filter'
import AddPerson from './components/AddPerson'


const App = () => {

  const [persons, setPersons] = useState([])
  useEffect(() =>{
    axios.get("http://localhost:3001/persons").then(response => setPersons(response.data))
  },[])
  
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const filter_result = persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  
  const addName = (event) => {
    event.preventDefault()
    const list_of_names = persons.map(person => person.name.toLowerCase())
    if(list_of_names.includes(newName.toLowerCase())){
      window.alert(`${newName} is already added to phonebook`)

    } else {
      const personObj = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(personObj))
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

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}/>
      <AddPerson addName={addName} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      {filter_result.map(person => 
        <Person key={person.name} person={person} />)}
    </div>
  )

}

export default App
