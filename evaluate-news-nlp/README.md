# Project Instructions

This application allows a user to submit a URL through a form, and receive information with regards to the language used in that article, via an NLP API.
The API used in this project is owned by MeaningCloud.

## Project Structure

This application contains just one basic HTML home page, with a form text field where the user enters the URL, and a submit button. (where the API call will be triggered)
nameChecker.js contains a function which validates that the URL the user submitted is valid. The form validation function was taken from this blog post: https://www.thewebblinders.in/programming/article/html-javascript-how-to-validate-a-url-or-link-field-6012
formHandler.js contains an asynchronous function which makes the POST Request to the server once the URL that the user submitted has been validated. This file also contains an updateUI function to display the data returned from the API call in the browser.
Index.js contains the server-side code used to handle Post Requests and Get Requests, and makes the call to the MeaningCloud API (by dynamically building the API call URL)

## Setting up the API

The MeaningCloud documentation is available here: https://learn.meaningcloud.com/developer/sentiment-analysis/2.1/doc/what-is-sentiment-analysis
We signed up for an API key which is stored privately and not available to view in this repo.
