const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { mongoose } = require('./db');
let userController = require('./controllers/userController');
const {request} = require("express");

const port = 3000;

let server = express();
server.use(bodyParser.json());
server.use(cors());

server.use('/', express.static('./frontend/dist/frontend'));

server.use('/user', userController);
server.listen(port, () => console.log('Server started at port : ' + port))

