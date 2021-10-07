const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/web-tech', error => {
    if (!error)
        console.log('MongoDB connection successful.');
    else
        console.log('Error in DB connection: ' + JSON.stringify(error, undefined, 2));
});

module.exports = mongoose;