
////Requiring NPM Packages//
//Used to import API Key from .env file
const dotenv = require('dotenv');
//Note - may need to install this in terminal
//Cross-origin-allowance - required when making requests across different domains
const cors = require('cors');
const path = require('path')
//Express is needed to run the server and set up route handlers
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
//An extra middle-ware layer used to handle POST Requests (by parsing the returned data)
const bodyParser = require('body-parser');
//Need to investigate and understand what this is...
const fetch = require('node-fetch');
//Get API Key from .env file
const key = process.env.API_KEY;

dotenv.config();

//Create an instance of our app
const app = express();

//Configure the app
//Explaining how we want the data to be dealt with
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());
//This directs the app to the folder we want to use to run the client-side code
app.use(express.static('dist'))

//API Documentation
//https://learn.meaningcloud.com/developer/sentiment-analysis/2.1/doc/what-is-sentiment-analysis

//DYNAMICALLY BUILD THE URL
const urlRoot = 'https://api.meaningcloud.com/sentiment-2.1';
const urlKey = `?key=${key}`;
const urlModel = '&model=general';
const urlLanguage = '&lang=en';
const urlUserInput = '&url='


//Spin up the Server
const port = 8000;
const server = app.listen(port, listening);
function listening() {
    console.log("server running");
    console.log(`running on local host: ${port}`);
};

//GET Request -> used to retrieve remote data
//POST Request -> used to send data


//GET ROUTE 1 - When get request is made to root folder, serve the home page browser
app.get('/', function (req, res) {
    // Below was template Udacity code
    //res.sendFile(path.resolve('src/client/views/index.html'))
    res.sendFile('dist/index.html');
})

//GET ROUTE 2 - When get request is made to /test, Test connection between Server & Client by calling mockAPIResponse Function
app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})


//POST Route 
//When POST request is made to the /callAPI Route, call the callAPI asynch function
app.post('/callAPI', callAPI);

//Note use of async keyword. THis gives access to await, try, catch - asynchronous function keywords
async function callAPI(req, res){
//Log out the URL the user requested for convenience and debugging
console.log(`User has requested the following URL: ${req.body}`);
//Dynamically build the URL
const url = urlRoot + urlKey + urlLanguage + urlModel + urlUserInput + req.body;
//Log out the full URL used to make the Fetch request for convenience and debugging
console.log(url);

//Here we make the fetch request, using URL built above
//Fetch requests return an inherent promise, so the code won't move to next line until fetch request returns a reponse (promise resolves)
const response = await fetch(url);

//If the fetch request was successful, the try block will execute
try {
    const returnedData = await response.json();
    //Test if the fetch request was successful
    if(returnedData.statusCode == 0) {
    //If Successful store the message in the variable, and send the data back as a response
        returnedData.message = "Data successfully retrieved";
        res.send(returnedData);
    } else {
    //If unsuccessful log the message
        console.log("Data could not be retrieved! API Call Failed!");
    }
//If the fetch request was not successful, then the catch block of code will execute
//Log the error and send it as a response
} catch (err) {
    console.log(err);
    res.send(err);
}

}

