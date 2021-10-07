const mongoose = require('mongoose');

let User = mongoose.model('user', {
    email: {type: String},
    password: {type: String},
    name: {type: String},
    phone: {type: String},
    mobile: {type: String},
    address: {type: String},
    hobby: {type: String},
    movie: {type: String},
    series: {type: String},
    game: {type: String},
}, 'users');

module.exports = { User };