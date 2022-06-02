const express = require("express");
var cors = require('cors')
const { json } = require("express/lib/response");
const app = express();
const PORT = process.env.PORT || 8080;
const fs = require("fs");


app.use(cors())

app.get("/", async (req, res) => {
    try {
        fs.readFile("./invalidDomains.json", "utf8", (err, jsonString) => {
            if (err) {
                console.log("File read failed:", err);
                return;
            }
            jsonString = JSON.parse(jsonString);
            res.send(jsonString)
        });
    } catch (error) {
        console.log(error.message)
    }
})


app.listen(process.env.PORT, () => { console.log("app is listening on http://localhost:8080 ...") })