//Let's build a chat
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

const users = [
    {id: 1, name: 'user1'},
    {id: 2, name: 'user2'},
    {id: 3, name: 'user3'},
    {id: 4, name: 'user4'}
]

app.get('/', (req, res) => {
    res.send('Hello World');
});

//Our API

//On veut pouvoir gérer des utilsateurs via notre API 

//GET 

app.get('/api/users', (req, res) => {
    res.send(users);
});

app.get('/api/users/:id', (req, res) => {   
    const user = users.find( u => {
        if(u.id == parseInt(req.params.id)) return u;
    });

    if(!user) res.status(404).send('User not found');
    
    res.send(user);
});

//POST 

app.post('/api/users', (req, res) => {
    const user = {
        id: users.length + 1,
        name: req.body.name
    }

    users.push(user);

    res.send(users);
});

//PUT 

app.put('/api/users/:id', (req, res) => {
    const user = users.find( u => {
        if(u.id == parseInt(req.params.id)) return u;
    });

    if(!user) res.status(404).send('User not found');

    user.name = req.body.name;

    res.send(user);

});

//DELETE 

app.delete('/api/users/:id', (req, res) => {
    const user = users.find( u => {
        if(u.id == parseInt(req.params.id)) return u;
    });

    if(!user) res.status(404).send('User not found');

    const index = users.indexOf(user);
    users.splice(index, 1);
    res.send(users);
});

const port = process.env.PORT || 8080;

app.listen(port, () => { console.log(`Serveur en écoute sur le port ${port}`)});

