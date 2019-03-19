const express = require('express');
const db = require('./db/index.js');
const PORT = process.env.PORT || 5000;
const app = require('./app.js');

db.connect()
  .then(() => {
  	console.log(`Listening on Port: ${PORT}`);
    app.listen(PORT);
  })
