const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const { randomBytes } = require('crypto');

// create express app
const app = express();

// need this to make sure we avoid the CORS error when the client tries to hit our endpoint
app.use(cors());

// makes sure that the json data in a request body gets properly parsed into json (and can be used and interpreted in the code from express??)
app.use(bodyParser.json());

const posts = {};



// these routes create the endpoints for the server
app.get('/posts', (req, res) => {
    res.send(posts);
});

app.post('/posts', async (req, res) => {
    const id = randomBytes(4).toString('hex');
    const {title} = req.body;

    posts[id] = {
      id, title
    };

    await axios.post('http://localhost:4005/events', {
        type: 'PostCreated',
        data: {
					id,
					title
				}
    });

    // send back a 201 to indicate the post is created and also send back the data of the created post (i think this is p standard for post reqs)
    res.status(201).send(posts[id]);
});

app.post('/events', (req, res) => {
	console.log('Received event', req.body.type);

	res.send({});
});

// this starts up the express server
app.listen(4000, () => {
    console.log('Listening on 4000');
})