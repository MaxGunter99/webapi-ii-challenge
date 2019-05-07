const express = require('express');

const server = express();

const postsRouter = require("./data/post-router");

server.use(express.json());

server.use( '/api/posts', postsRouter );

server.get('/', (req, res) => {
  res.send(`
    <h2>Lambda Posts API</h>
    <p>Welcome to the Lambda Posts API</p>
  `);
});


module.exports = server;