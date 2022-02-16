const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://dcc:dcc123@cluster0.gyxp7.mongodb.net/web-tech?retryWrites=true&w=majority/', error => {
    if (!error)
        console.log('MongoDB connection successful.');
    else
        console.log('Error in DB connection: ' + JSON.stringify(error, undefined, 2));
});

module.exports = mongoose;