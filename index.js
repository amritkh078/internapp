const express = require('express');
const client = require('./config/dbcon.js');
const internRoutes = require('./routes/internRoutes.js');
const applicationRoutes = require('./routes/applicationRoutes.js');

const app = express();

app.use('/internships', internRoutes);
app.use('/applications', applicationRoutes);

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