const express = require('express');
const fs = require('fs');
const app = express();

const data = JSON.parse(fs.readFileSync('db.json'));
const time = Date().toString();


app.get("/info", (req, res) => {
    return res.send(`Phonebook has ${data.persons.length} people in it <br> <br> ${time}`);
})

app.get("/api/persons", (req, res) => {
    return res.send(data);
})

app.get("/api/persons/:id", (req, res) => {
    const id = req.params.id
    console.log(id)
    const people = data.persons
    console.log(people)
    const person = people.filter((person) => person.id == id)
    console.log(person[0])
    return res.send(person[0])
})

app.listen(3001, () => {
    console.log("Piippiip")
})