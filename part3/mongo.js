const { MongoTopologyClosedError } = require('mongodb')
const mongoose = require('mongoose')

const password = process.argv[2]
const new_name = process.argv[3]
const new_number = process.argv[4]

const url = `mongodb+srv://fs-open-user1:${password}@fs-open1-cluster.pkqp6.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    id: Number,
    name: String,
    number: String  
})

const Person = mongoose.model('Person', personSchema)

if(process.argv[3] == 'delete'){
    const id_d = process.argv[4]

    Person.findByIdAndRemove(process.argv[4]).then(() => {
        console.log('delete called')
        mongoose.connection.close()
        process.exit(1)
    })
}

if (process.argv.length > 3){

    const person = new Person({
        id: Math.floor(Math.random() * 999999),
        name: new_name,
        number: new_number
    })

    person.save().then(response => {
        console.log(`added ${new_name} number ${new_number} to phonebook `)
        mongoose.connection.close()
    })
}

if (process.argv.length == 3){
    console.log('phonebook: ')
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(`${person.name} ${person.number}`)
        })
    mongoose.connection.close()
    })
}


if (process.argv.length < 3){
    console.log('give password as argument')
    process.exit(1)
}