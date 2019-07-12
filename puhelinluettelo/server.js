const express = require('express');
const fs = require('fs');
const app = express();

const data = JSON.parse(fs.readFileSync('db.json'));

app.get("/", (req, res) => {
    return res.send("Puhelinluettelon API");
})

app.get("/api/persons", (req, res) => {
    return res.send(data);
})

app.listen(3001, () => {
    console.log("Piippiip")
})