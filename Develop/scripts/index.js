// const noteText = document.getElementById('note-text');
// const textArea = document.getElementById('text-area');


//append new note to list-group in html


// Get a list of existing notes from the server (change code)
const getNotes = () =>
  fetch('/api/notes', {
    method: 'GET', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
    },
    // body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => {
      console.error('Error:', error);
    });
// Post a new notes to the page (change code)
const postNotes = (notes) =>
  fetch('/api/notes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(notes),
  })
    .then((response) => response.json())
    .then((data) => {
      alert(data);
      createCard(notes);
    })
    .catch((error) => {
      console.error('Error:', error);
    });