const express = require('express');
const client = require('./config/dbcon.js');

const app = express();

app.use(express.json());

client.connect(
    function(err) {
        if (err) {
            console.log("Error connecting to database", err);
        } else {
            console.log("Database successfully connected");
        }
    }
);

app.listen(3000);