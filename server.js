require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyPareser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose')
const Person = require('./models/person');

const port = process.env.PORT;


app.use(express.static('build'))
app.use(bodyPareser.json());
app.use(cors());
morgan.token('post', function (req, res) { return JSON.stringify(req.body)})
app.use(morgan(':method :url :status :response-time ms :post', {
    skip: function (req, res) { return req.method != 'POST'}
}));


const errorHandler = (error, request, response, next) => {
    console.error(error.message)
    if (error.name === 'CastError' && error.kind == 'ObjectId') {
      return response.status(400).send({ error: 'malformatted id' })
    } 
    next(error)
}
app.use(errorHandler)


app.get("/info", (req, res) => {
    Person.find({}).then(response => {
        return res.send(`Phonebook has ${response.length} people in it <br> <br> ${Date().toString()}`);
    })
})


app.get("/api/persons", (req, res) => {
    Person.find({}).then(result => {
        res.json(result.map(person => person.toJSON()));
    });  
});


app.get("/api/persons/:id", (req, res) => {
    Person.findById(req.params.id).then(person => {
        if(person) {
            res.json(person.toJSON());
        }else {
            res.status(404).end()
        }
    }).catch(error => {
        console.log(error)
        res.status(400).send({ error: 'malformatted id' })
      })
})


app.post("/api/persons", (req, res) => {
    const rndNumber = Math.floor(Math.random()*100000);
    const body = req.body;
    body.id = rndNumber;

    if(!body.name.length || !body.number.length){
        return res.status(400).json({err: 'content missing'});
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


app.put("/api/persons/:id", (req, res, next) => {
    const person = {name: req.body.name, number: req.body.number}
    Person.findByIdAndUpdate(req.params.id, person, { new: true })
        .then(updatedPerson => {
            console.log(updatedPerson)
            return res.json(updatedPerson.toJSON())
        }).catch(err => next(err));
})

app.delete("/api/persons/:id", (req, res, next) =>{
    Person.findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(204).end()
    })
    .catch(error => next(error));
})


const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint);


app.listen(port, () => {
    console.log("Piippiip")
})