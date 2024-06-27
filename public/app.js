// app.js

document.getElementById('note-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
  
    fetch('/api/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, content })
    })
    .then(response => response.json())
    .then(note => {
      document.getElementById('title').value = '';
      document.getElementById('content').value = '';
      addNoteToDOM(note);
    });
  });
  
  function fetchNotes() {
    fetch('/api/notes')
      .then(response => response.json())
      .then(notes => {
        const notesContainer = document.getElementById('notes');
        notesContainer.innerHTML = '';
        notes.forEach(note => {
          addNoteToDOM(note);
        });
      });
  }
  
  function addNoteToDOM(note) {
    const noteElement = document.createElement('div');
    noteElement.classList.add('note-card');
    noteElement.innerHTML = `
      <h2>${note.title}</h2>
      <p>${note.content}</p>
      <button class="edit" onclick="editNote('${note._id}', '${note.title}', '${note.content}')">Edit</button>
      <button onclick="deleteNote('${note._id}')">Delete</button>
    `;
    document.getElementById('notes').appendChild(noteElement);
  }
  
  function deleteNote(id) {
    fetch(`/api/notes/${id}`, {
      method: 'DELETE'
    })
    .then(response => response.json())
    .then(() => {
      fetchNotes();
    });
  }
  
  function editNote(id, title, content) {
    const newTitle = prompt('Enter new title:', title);
    const newContent = prompt('Enter new content:', content);
  
    if (newTitle && newContent) {
      fetch(`/api/notes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title: newTitle, content: newContent })
      })
      .then(response => response.json())
      .then(() => {
        fetchNotes();
      });
    }
  }
  
  fetchNotes();
  