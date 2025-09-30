const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

const supplierRouters = require("./routes/supplierRoters")
const userRouters = require("./routes/userRouters")

const app = express();


dotenv.config();
app.use(bodyParser.json());
const PORT = process.env.PORT


// Router
app.use("/api/suppliers", supplierRouters);
app.use("/api/users", userRouters);


app.get("/api", (req,res) => {
    res.send("Hello World !")
})


app.listen(PORT, () => {
    console.log(`Express API running in PORt: ${PORT}`)
})