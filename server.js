const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var dotenv = require('dotenv');
const cors = require('cors');
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
dotenv.config();
app.use(bodyParser.json())



// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});





app.get('/', (req, res) => {
    res.json({"message": "Live"});
});

require('./app/routes/todo.routes.js')(app);

app.listen(process.env.PORT, () => {
    console.log("Server is listening on port"+process.env.PORT);
});
