 
// Setup empty JS object to act as endpoint for all routes
// Create JS object
projectData = {};

//set port to 8000
const port = 8000;

// Require Express to run server and routes
//setup express ,bodyParser and cors:
const express = require('express');
const bodyParser = require('body-parser');
// Start up an instance of app
const app = express();
//////////////////////////

/* Middleware*/

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Cors for cross origin allowance
const cors = require('cors');

app.use(cors());

//////////////////////////////////////
/* Initialize the main project folder*/
app.use(express.static('website'));

// Setup Server

const server = app.listen(port, () => { console.log(`running on localhost: ${port}`) });


// GET route
app.get('/all', sendData);

function sendData (request, response) {
    response.send(projectData);
    console.log(projectData);
};


//POST: to send info to server:
app.post('/add', callback);

function callback(req, res) {
    console.log('data of server', req.body);
    projectData.temp = req.body.temp;
    projectData.date = req.body.date;
    projectData.content = req.body.content;
    projectData.name = req.body.name;
    res.send(projectData);
    
}


