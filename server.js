const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

let posts = [
  { id: 1, title: 'Lixo encontrado na Praia Grande', description: 'Muitos plásticos e garrafas...', comments: [] },
  { id: 2, title: 'Sacos de lixo na Praia de Santos', description: 'Várias sacolas de lixo espalhadas...', comments: [] },
];

app.get('/posts', (req, res) => {
  res.json(posts);
});

app.get('/posts/:id', (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  if (post) {
    res.json(post);
  } else {
    res.status(404).send('Post not found');
  }
});

app.post('/posts', (req, res) => {
  const newPost = {
    id: posts.length + 1,
    title: req.body.title,
    description: req.body.description,
    comments: [],
  };
  posts.push(newPost);
  res.status(201).json(newPost);
});

app.post('/posts/:id/comments', (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  if (post) {
    const newComment = {
      id: post.comments.length + 1,
      text: req.body.text,
    };
    post.comments.push(newComment);
    res.status(201).json(newComment);
  } else {
    res.status(404).send('Post not found');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
