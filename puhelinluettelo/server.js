const express = require('express');
const fs = require('fs');
const app = express();
const db = require('./db')

const data = db;
const time = Date().toString();


app.get("/info", (req, res) => {
    return res.send(`Phonebook has ${data.persons.length} people in it <br> <br> ${time}`);
})

app.get("/api/persons", (req, res) => {
    return res.send(data);
})

app.get("/api/persons/:id", (req, res) => {
    const id = req.params.id
    const people = data.persons
    const person = people.filter(person => person.id == id)

    if(!person.length){
        return res.status(404).send("No such person found")
    }else{
        return res.status(200).send(person[0])
    }
})

app.listen(3001, () => {
    console.log("Piippiip")
})