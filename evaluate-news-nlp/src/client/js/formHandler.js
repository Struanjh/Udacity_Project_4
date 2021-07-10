//Basic Workflow:
//1) User submits the URL & (after passing validation) we POST the data to the Server. (USING HTTP POST REQUEST with Fetch API)
//2) Server POST Route handles the request & makes an HTTP GET Request with Fetch API to MeaningCloud API, and stores response in variable returnedData (all in Index.js)
//3) THe apiData variable holds the response from index.js (returnedData), the response is converted to JSON, & call the updateUI function to transfer results to the browser.

//Import required functions
import { checkForName } from './nameChecker';


//Required package to make window.fetch compatible API call on node.js runtime environment (also installed this via terminal)
const fetch = require('node-fetch');

//Create Event Listener on the Form Submit Button
const sendData = document.getElementById('formSubmit');
sendData.addEventListener('click', handleSubmit);


//This function will be called when the form is submitted by the user
 async function handleSubmit(event) {
    //Don't allow the form to submit the data - which is the default behaviour
    event.preventDefault()

    //Declare variables which will hold results from API Fetch
    const subjectivity =  document.getElementById('subjectivity');
    const agreement =  document.getElementById('agreement');
    const irony =  document.getElementById('irony');
    const confidence =  document.getElementById('confidence');
    const errorMessage = document.getElementById('error message');

    //Clear Previous Form Results & Error Message
    subjectivity = "";
    agreement = "";
    irony = "";
    confidence = "";
    errorMessage = "";



     //Get the URL the user inputted
    const formText = document.getElementById('name').value
 
    // Perform form validation using the checkForName function (Located in formHandler.js)
    checkForName(formText);

    //If the function returns true - the URL was valid - so make error message blank
    if (checkforName()) {
        errorMessage = "";
    //Call the API function which makes the POST Request
        const apiData = await makeAPICall('http://localhost:8000/callAPI', formText)
    //Once apiData function returns a response, convert the response to json
    //Equivalent to: .then( function (apiData) { apiData.json() })
            .then(apiData => apiData.json())
    //Finally call the UI function to display the results in the browser
            .then(function(response) {
                updateUI(response)
            })
    //If the function returns false - the URL was invalid - so display the error message
    } else {
        errorMessage = "Please enter a valid URL";
    }
}

    //Use this asynchronous function to make the POST Request
    export async function makeAPICall(url, userInput) {

    //Use Fetch to post the data - since we use await, the function will not complete until the promise has resolved (we receive a response)
        let response = await fetch(url, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'text/plain',
            },       
            body: userInput,
        })
    
        return response
    }


// Updates the UI so user can see the result of analysis
function updateUI(response) {
    subjectivity.innerHTML = `Subjectivity is ${response.subjectivity}`;
    agreement.innerHTML = `Agreement is ${response.agreement}`;
    irony.innerHTML = `Irony is ${response.irony}`;
    confidence.innerHTML = `Confidence (1-100%) is ${response.confidence}%`;
}


export { handleSubmit }
export { updateUI }



