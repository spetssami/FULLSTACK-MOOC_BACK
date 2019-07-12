const express = require('express');
const fs = require('fs');
const app = express();

const data = JSON.parse(fs.readFileSync('db.json'));
console.log(data.persons.length)
const time = Date().toString()


app.get("/info", (req, res) => {
    return res.send(`Phonebook has ${data.persons.length} people in it <br> <br> ${time}`);
})

app.get("/api/persons", (req, res) => {
    return res.send(data);
})

app.listen(3001, () => {
    console.log("Piippiip")
})