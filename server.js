
const { urlencoded } = require('express');
const express = require('express');
const fs = require('fs');
const path = require('path');
const db = require('./db/db.json');
const uuid = require('./helpers/uuid');


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

    const { id, title, text } = req.body;

    const newNote = {
        id: uuid(),
        title,
        text
    };

    db.push(newNote);


    fs.writeFile('./db/db.json', JSON.stringify(db), function (err) {
        if (err) {
            return console.log(err);
        } else {
            console.log('Note Saved!')
        }
    });
    return res.json(db);
});


app.listen(PORT, () => console.log(`App listening on https://localhost:${PORT}`));
