const { notStrictEqual } = require('assert');
const express = require('express');
const fs = require('fs');
const path = require('path');
const db = require('./db/db.json');
const uuid = require('./helpers/uuid');

const randomId = uuid();
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static('public'));
app.use(urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));

});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('/api/notes', (req, res) => {
    res.json(db);
});

app.post('/api/notes', (req, res) => {
    const newNote = req.body;


    randomId(newNote);

    db.push(newNote);

    fs.writeFile(__dirname, './db/db.jon', JSON.stringify(db), function (err) {
        if (err) {
            return console.log(err);
        } else {
            console.log('Note Saved!')
        }
    });
    return res.json(newNote);
});


app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
