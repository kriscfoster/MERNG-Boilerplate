const mongoose = require('mongoose');
const DB_URI = 'mongodb://localhost:27017/my-new-app';

function connect() {
  return new Promise((resolve, reject) => {
    mongoose.connect(DB_URI,
      { useNewUrlParser: true, useCreateIndex: true })
      .then((res, err) => {
        if (err) return reject(err);
        console.log('Connected to DB');
        resolve();
      });
  });
}

module.exports = { connect };
