import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const addPerson = personObj => {
    const request = axios.post(baseUrl, personObj)
    return request.then(response => response.data)
}

const deletePerson = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

const getAllPersons = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const getSinglePerson = (id) => {
    const request = axios.get(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

const updateNumber = (person, newNumber) => {
    const request = axios.put(`${baseUrl}/${person.id}`,{...person, number: newNumber})
    return request.then(response => response.data)
}


export default{
    addPerson,
    deletePerson,
    getAllPersons,
    getSinglePerson,
    updateNumber
}