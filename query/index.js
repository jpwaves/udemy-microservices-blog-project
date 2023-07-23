const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const posts = {};

const handleEvent = (type, data) => {
  if (type === 'PostCreated') {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  } else if (type === 'CommentCreated') {
    const { id, content, status, postId } = data;

    const post = posts[postId];
    post.comments.push({ id, content, status });
  } else if (type === 'CommentUpdated') {
    const { id, content, status, postId } = data;

    const post = posts[postId];
    const comment = post.comments.find(comment => comment.id === id);

    comment.content = content;
    comment.status = status;
  }
};

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/events', (req, res) => {
  console.log('Received event', req.body.type);

  const { type, data } = req.body;
  
  handleEvent(type, data);

  // not sure if this is standard but we send back and empty object to let the caller know the post was successful
  res.send({});
});

app.listen(4002, async () => {
  console.log('Listening on 4002');

  try {
    const res = await axios.get('http://event-bus-srv:4005/events');

    for (let event of res.data) {
      console.log('Processing event', event.type);
      handleEvent(event.type, event.data);
    }
  } catch (error) {
    console.log(error);
  }
});
