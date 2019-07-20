const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyPareser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const port = process.env.PORT || 3001

app.use(bodyPareser.json());
app.use(express.static('build'))
app.use(cors());
morgan.token('post', function (req, res) { return JSON.stringify(req.body)})
app.use(morgan(':method :url :status :response-time ms :post', {
    skip: function (req, res) { return req.method != 'POST'}
}));


const url = 'mongodb+srv://fullstack:<PASSWORD>@full-stack-open-daq2p.mongodb.net/phonebook-app?retryWrites=true'
mongoose.connect(url,  {useNewUrlParser: true })
    .then(result => {    
        console.log('connected to MongoDB')  
        })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)  
        })

const personSchema = new mongoose.Schema({
    name: String,
    number: String
});

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
      }
});

const Person = mongoose.model('Person', personSchema);  


app.get("/info", (req, res) => {
    return res.send(`Phonebook has ${data.length} people in it <br> <br> ${Date().toString()}`);
})

app.get("/api/persons", (req, res) => {
    Person.find({}).then(result => {
        res.json(result.map(person => person.toJSON()));
    });  
});

app.get("/api/persons/:id", (req, res) => {
    // const id = req.params.id;
    // const people = data;
    // const person = people.filter(person => person.id == id)

    // if(!person.length){
    //     return res.sendStatus(404);
    // }else{
    //     return res.send(person[0]);
    // }
    Person.findById(req.params.id).then(person => {
        res.json(person.toJSON())
    });  
})

app.post("/api/persons", (req, res) => {
    const rndNumber = Math.floor(Math.random()*100000);
    const body = req.body;
    body.id = rndNumber;

    const person = new Person({name: body.name, number: body.number})
    if(!body.name.length || !body.number.length){
        return res.status(404).json({err: 'content missing'});
    }else {
        if(data.find((person) => person.name == body.name)){
            return res.send("person is already in the list");
        }else{
            person.save()
            //console.log(body)
            return res.send(body);
        }
    }
})


app.delete("/api/persons/:id", (req, res) =>{
    const id = req.params.id;
    const people = data;

    const filteredPeople = people.filter(person => person.id != id);
    data = filteredPeople;
    if(filteredPeople.length === people.length){
        return res.send("person not found")    
    }else{
        return res.send(data)
    }
})
app.listen(port, () => {
    console.log("Piippiip")
})