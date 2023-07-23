const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

const events = [];

app.post('/events', async (req, res) => {
    // we are assuming that the event is in the body of the request, but the event could be in any data format/structure
    const event = req.body;

    // this is so we can add to our event store (aka history of all events during app lifetime)
    events.push(event);

    axios.post('http://posts-clusterip-srv:4000/events', event).catch(err => console.log(err));
    axios.post('http://comments-srv:4001/events', event).catch(err => console.log(err));
    axios.post('http://query-srv:4002/events', event).catch(err => console.log(err));
    axios.post('http://moderation-srv:4003/events', event).catch(err => console.log(err));
    res.send({ status: 'OK' })
});

app.get('/events', (req, res) => {
    res.send(events);
});

app.listen(4005, () => {
    console.log('Listening on 4005');
});