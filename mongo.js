const mongoose = require('mongoose')

if ( process.argv.length < 3 ) {
  console.log('You give too little information')
  process.exit(1)
}


const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://fullstack:${password}@full-stack-open-daq2p.mongodb.net/phonebook-app?retryWrites=true`

mongoose.connect(url, { useNewUrlParser: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name,
  number
})

if(process.argv.length <5 ){
  Person.find({}).then(result => {
    console.log("Phonebook")
      result.forEach(person => {
        console.log(person)
      })
      mongoose.connection.close()
  })
}else {
  person.save().then(response => {
    console.log(`Added ${response.name} number ${response.number} to phonebook`)
  console.log(response);
  mongoose.connection.close();
})
}



