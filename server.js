const express = require('express');
const app = express();
const path = require('path');
app.listen(process.env.PORT || 5000, () => console.log("Server runnining..."));

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, './public')));


app.get('/', (req, res) => {
    res.sendFile('login.html', {
        root: path.join(__dirname, './public')
    })
});

let comments = [{
        id: 1,
        username: "Rady",
        message: "Indicates a successful or positive action.",
        color: 'alert-success',
        b: '',
        i: 'i',
        u: '',
    },
    {
        id: 2,
        username: "Kanha",
        message: "Indicates a successful or positive action.",
        color: 'alert-info',
        b: 'b',
        i: '',
        u: '',
    },
    {
        id: 3,
        username: "Thida",
        message: "Indicates a successful or positive action.",
        color: 'alert-dark',
        b: '',
        i: '',
        u: 'u',
    },
    {
        id: 3,
        username: "Chanpa",
        message: "Indicates a successful or positive action.",
        color: 'alert-primary',
        b: '',
        i: '',
        u: '',
    },
];
app.get('/comments', (req, res) => {
    res.send(comments);
});


app.post('/comments', (req, res) => {
    if (!req.body.message) {
        res.status(400)
        return res.send({
            error: "Message cannot empty"
        })
    }
    let user = {
        id: comments.length + 1,
        username: req.body.username,
        message: req.body.message,
        color: req.body.color,
        b: req.body.b,
        i: req.body.i,
        u: req.body.u
    }
    comments.push(user);
    res.send(comments);
});


let users = [{
        id: 1,
        username: "rady",
        password: "123",
        color: 'alert-success'
    },
    {
        id: 2,
        username: "kanha",
        password: "123",
        color: 'alert-info'
    },
    {
        id: 3,
        username: "thida",
        password: "123",
        color: 'alert-dark'
    },
]

app.get('/logined', (req, res) => {
    res.sendFile('comment.html', {
        root: path.join(__dirname, './public')
    })
})

app.get('/users', (req, res) => res.send(users));

app.post('/users', (req, res) => {
    let userName = req.body.username;
    let pass = req.body.password;
    let isCorrect = false;
    for (let user of users) {
        if (user.username === userName && user.password === pass && !isCorrect) {
            isCorrect = true;
        }
    }

    if (isCorrect) {
        res.send(users)
    } else {
        res.send([{
            error: "Username & password not correct!"
        }])
    }
});