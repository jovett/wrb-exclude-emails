require("dotenv").config();
const { MongoClient } = require('mongodb');
const express = require("express");
var cors = require('cors')
const app = express();
const PORT = process.env.PORT || 8080;


app.use(cors())
app.use(express.json())

app.get("/", async (req, res) => {
    try {
        getAllDomains(req,res)
    } catch (error) {
        console.log(error.message)
    }
})


const client = new MongoClient(process.env.MONGO_URI);


const getAllDomains = async (req, res) => {
    const db = client.db("domains");
    const collection = db.collection('domainNames');
    const findResult = await collection.find({}).toArray();
    res.status(200).json({ findResult })
}




const start = async () => {
    try {
        // connect db
        await client.connect();
        app.listen(PORT, console.log(`Server is listening on port: ${PORT}...`));
    } catch (error) {
        console.log(error)
    }
}


start();