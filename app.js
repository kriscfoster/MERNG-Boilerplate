const express = require('express');
const expressGraphQL = require('express-graphql');
const schema = require('./graphql/schema.js');
const app = express();
const path = require('path');
console.log("aaa")
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/public/index.html'))
})

app.use('/graphql', expressGraphQL((req, res) => {
  return {
    graphiql: true,
    schema: schema,
  }
}));

module.exports = app;
