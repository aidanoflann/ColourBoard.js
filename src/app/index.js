const redis_db = require('../model/redis_db.js');

// this will be inside a Docker container, so use 0.0.0.0 instead of 127.0.0.1 loopback
const hostname = '0.0.0.0';
const port = 3000;

const express = require('express');
const app = express();
app.set('view engine', 'pug');
app.set('views', './src/views');

app.get('/', (request, response) => {
    console.log('Request received');
    redis_db.getPlayers().then( (players) => {
        console.log(players);
        response.render('index', {'currentlyLoggedInColour': players.CurrentlyLoggedInPlayer().colour});
    })

    // console.log(players.CurrentlyLoggedInPlayer().colour);
    // response.render('index', {"currentlyLoggedInColour": players.CurrentlyLoggedInPlayer().colour});
    // console.log('Request complete');
});
app.listen(port, hostname, () => {console.log('Server started on port: ' + port)});
