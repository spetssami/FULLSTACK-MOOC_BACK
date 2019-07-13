const express = require('express');
const app = express();
const db = require('./db');
const morgan = require('morgan');
const bodyPareser = require('body-parser');
const port = process.env.PORT || 3001

app.use(bodyPareser.json());
app.use(morgan('tiny'));
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
        return res.sendStatus(404);
    }else{
        return res.send(person[0]);
    }
})

app.post("/api/persons", (req, res) => {
    const rndNumber = Math.floor(Math.random()*100000);
    const body = req.body;
    body.id = rndNumber;

    if(!body.name.length || !body.number.length){
        return res.sendStatus(404);
    }else {
        if(data.find((person) => person.name == body.name)){
            return res.send("person is already in the list");
        }else{
            data.push(body);
            return res.sendStatus(200);
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