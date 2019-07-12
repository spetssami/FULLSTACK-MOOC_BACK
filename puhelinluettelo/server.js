const express = require('express');
const fs = require('fs');
const app = express();
const db = require('./db');
const bodyPareser = require('body-parser')

app.use(bodyPareser.json());
let data = db.persons;


app.get("/info", (req, res) => {
    return res.send(`Phonebook has ${data.length} people in it <br> <br> ${Date().toString()}`);
})

app.get("/api/persons", (req, res) => {
    return res.send(data);
})

app.get("/api/persons/:id", (req, res) => {
    const id = req.params.id;
    const people = data;
    const person = people.filter(person => person.id == id)

    if(!person.length){
        return res.status(404).send("No such person found");
    }else{
        return res.status(200).send(person[0]);
    }
})

app.post("/api/persons", (req, res) => {
    const rndNumber = Math.floor(Math.random()*100000);
    const body = req.body;
    body.id = rndNumber;
    console.log(body)
    data.push(body);
    return res.status(200).send(body)
})


app.delete("/api/persons/:id", (req, res) =>{
    const id = req.params.id;
    const people = data;

    const filteredPeople = people.filter(person => person.id != id);
    console.log(filteredPeople)
    data = filteredPeople;
    if(filteredPeople.length === people.length){
        return res.status(404).send("person not found")    
    }else{
    return res.status(200).send(data)
    }
})
app.listen(3001, () => {
    console.log("Piippiip")
})