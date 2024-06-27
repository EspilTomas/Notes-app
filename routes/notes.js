const express = require('express');
const router = express.Router();
const Note = require('../models/Note');

// Crear nota
router.post('/', (req, res) => {
  const newNote = new Note({
    title: req.body.title,
    content: req.body.content
  });
  newNote.save().then(note => res.json(note));
});

// Leer todas las notas
router.get('/', (req, res) => {
  Note.find().then(notes => res.json(notes));
});

// Leer una nota por ID
router.get('/:id', (req, res) => {
  Note.findById(req.params.id).then(note => res.json(note));
});

// Actualizar nota
router.put('/:id', (req, res) => {
  Note.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(note => res.json(note));
});

// Eliminar nota
router.delete('/:id', (req, res) => {
  Note.findByIdAndDelete(req.params.id)
    .then(() => res.json({ success: true }));
});

module.exports = router;
