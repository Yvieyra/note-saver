// db.json file  will be used to store and retreive notes using fs module 
const express = require('express');
const path = require('path');
//do you need middleware?
const uuid = require('./helpers/uuid');
const api = require('./public/index.html');

const PORT = process.env.port || 3001; //Heroku deployment configured port or 3001

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //do we need this?
app.use('/api', api); //do we need this?

app.use(express.static('public')); //middleware that serves static files from public folder 

//create GET /api/notes to read the db.json file and return all saved notes as JSON
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('/index', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);
//create POST /api/notes to receive a new note save on the request body, and ass it othe db.json file. This should return the new note to the client.
//each new note that is saved should have a unique id using an npm package.







app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
