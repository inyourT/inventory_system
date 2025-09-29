const express = require("express");
const dotenv = require("dotenv");



dotenv.config();

const app = express();
const PORT = process.env.PORT


app.get("/api", (req,res) => {
    res.send("Hello World !")
})

app.get("/products", (req,res) => {
    res.sed
})

app.listen(PORT, () => {
    console.log(`Express API running in PORt: ${PORT}`)
})