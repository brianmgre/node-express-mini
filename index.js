// implement your API here

//oimport axois from 'axios. Very similar to const express statement

const express = require('express');

const greeter = require('./greeter');

const db = require('./data/db');

const server = express();

server.use(express.json());

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


server.get('/users', (req, res)=>{
   const { id } = req.query;

   if(id) {
        db.findById(id).then(users => res.send(users));
   } else {
       db.find().then(user => res.send(users));
   }
});


server.post('/api/users', async (req, res) => {
    try {
        const userData = req.body;
        const userId = await db.insert(userData);
        const user = await db.findById(userId.id);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: 'error creating user', error });
    }
});

server.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    db.update(id, changes)
        .then(count => {
            if (count) {
                res.status(200).json({ message: `${count} user was updated` })
            } else {
                res.status(404).json({ message: 'user not found' });
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'error updating user' });
        });
});


server.delete('/api/users/:id', (req, res) => {
    db.remove(req.params.id)
        .then(count => {
            res.status(200).json(count);
        })
        .catch(err => {
            res.status(500).json({ message: 'error deleting user' });
        });
});




server.get('/greet/:person', greeter);

server.listen(9000, () => console.log('server is alive'))