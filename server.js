require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyPareser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose')
const Person = require('./models/person');

const port = process.env.PORT;

app.use(bodyPareser.json());
app.use(express.static('build'))
app.use(cors());
morgan.token('post', function (req, res) { return JSON.stringify(req.body)})
app.use(morgan(':method :url :status :response-time ms :post', {
    skip: function (req, res) { return req.method != 'POST'}
}));




app.get("/info", (req, res) => {
    return res.send(`Phonebook has ${data.length} people in it <br> <br> ${Date().toString()}`);
})

app.get("/api/persons", (req, res) => {
    Person.find({}).then(result => {
        res.json(result.map(person => person.toJSON()));
    });  
});

app.get("/api/persons/:id", (req, res) => {
    Person.findById(req.params.id).then(person => {
        res.json(person.toJSON());
    });  
})

app.post("/api/persons", (req, res) => {
    const rndNumber = Math.floor(Math.random()*100000);
    const body = req.body;
    body.id = rndNumber;

    if(!body.name.length || !body.number.length){
        return res.status(404).json({err: 'content missing'});
    }else {
        Person.find({}).then(result => {
            if(result.find((person) => person.name == body.name)){
                res.status(502).json({err: "Person is already found"});
             }else{
                const person = new Person({name: body.name, number: body.number});
                person.save().then(savedPerson => {
                    res.json(savedPerson.toJSON());
                });
            }
        })
    }
});


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