import express from 'express';
const app = express();


app.get("/", (req, res) => {
    res.send("Puhelinluettelon API");
})



app.listen(3001, () => {
    console.log("Piippiip")
})