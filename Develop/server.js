const express = require('express');
const path = require('path');
const fs = require('fs'); // db.json file  will be used to store and retreive notes using fs module 
const { clog } = require('./middleware/clog'); //Do i need this middleware?
// const api = require('./scripts/index');
const notes = require('./db/db.json');
const uuid = require('./helpers/uuid'); //use this one or the v4 generated one from mini project, any difference?
const { readAndAppend, readFromFile} = require('./helpers/fsUtils'); 

const PORT = process.env.port || 3001; //Heroku deployment configured port or 3001

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(clog);
app.use(express.json()); //midlleware allows us to grab data in the body
app.use(express.urlencoded({ extended: true })); //middleware for parsing of URL encoded data into objects with key value pairs 
// app.use('/api', api); //do we need this?

app.use(express.static('public')); //middleware that serves static files from public folder 

// GET /notes will return the notes.html file
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);


// GET /api/notes should READ the db.json file and RETURN all saved notes as JSON.
app.get('/api/notes', (req, res) => {
  console.info(`${req.method} request received for notes`); // NOT LOGGING IN CONSOLE

  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
});


// POST /api/notes should RECEIVE a new note to save on the request body, ADD it to the db.json file, and THEN RETURN the new note to the client.
app.post('/api/notes', (req, res) => {
 // Log that a POST request was received
 console.info(`${req.method} request received to add a note`);

  // Destructuring assignment for the items in req.body
  const {title, text} = req.body;

  // If all the required properties are present
  if (title && text) {
    // Variable for the object we will save
    const newNotes = {
      title,
      text,
      note_id: uuid(),
    };

    readAndAppend(newNotes, './db/db.json');

    const response = {
      status: 'success',
      body: newNotes,
    };

    res.json(response);
  } else {
    res.json('Error in posting feedback');
  }
});

//GET * will return the index.html file
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);
//open console to find error in there as well 

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
