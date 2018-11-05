// implement your API here

//oimport axois from 'axios. Very similar to const express statement

const express = require('express');

const greeter = require('./greeter');

const db = require('./data/db');

const server = express();

server.get('/', (req, res) => {
    res.json('Hello there');
});


server.get('/greet', (req, res) => {
    res.json({ hello: 'stranger' });
});


server.get('/api/users', (req, res) => {
    db.find().then(users => {
        res.json(users);
    }).catch(err => {
        res.status(500).json({ message: 'we failed you, you will never get' });
    });
});

server.get('/api/users/:id', (req, res) => {
    const { id } = req.params;

    db.findById(id).then(user => {
        res.status(200).json(user)
    }).catch(err => {
        res.status(500).json({ message: 'you will never get' });
    });
});

server.get('/greet/:person', greeter);

server.listen(9000, () => console.log('server is alive'))