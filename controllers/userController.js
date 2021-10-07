const express = require('express');
let router = express.Router();
let ObjectId = require('mongoose').Types.ObjectId;

let { User } = require('../models/user');

router.get('/', (request, response) => {
    User.find((error, docs) => {
       if (!error)
           response.send(docs);
       else
           console.log('Error in retrieving User data : ' + JSON.stringify(error, undefined, 2));
    });
});

router.get('/:email', (request, response) => {
    // if (!ObjectId.isValid(request.params.id))
    //     return response.status(400).send('No record with given id: ' + request.params.id);
    // User.findById(request.params.id, (error, doc) => {
    //     if (!error)
    //         response.send(doc);
    //     else
    //         console.log('Error in retrieving user :' + JSON.stringify(error, undefined, 2));
    // });
    User.findOne(
        { email: request.params.email },
        null, null, (error, doc) => {
            if (doc)
                response.send(doc);
            else
                response.status(400).send('No user with given email: ' + request.params.email);
        }
    );
});

router.post('/', (request, response) => {
    User.findOne(
        { email: request.body.email },
        null, null, (error, doc) => {
            if (doc)
                response.status(400).send('User with email already exists.');
            else {
                let user = new User({
                    email: request.body.email,
                    password: request.body.password,
                    name: request.body.name,
                    phone: request.body.phone,
                    mobile: request.body.mobile,
                    address: request.body.address,
                    hobby: request.body.hobby,
                    movie: request.body.movie,
                    series: request.body.series,
                    game: request.body.game,
                });
                user.save().then((doc) => {
                    console.log(doc);
                    response.send(doc);
                });
            }
        }
    );

});

router.put('/:id', (request, response) => {
    if (!ObjectId.isValid(request.params.id))
        return response.status(400).send('No record with given id: ' + request.params.id);

    let user = {
        email: request.body.email,
        password: request.body.password,
        name: request.body.name,
        phone: request.body.phone,
        mobile: request.body.mobile,
        address: request.body.address,
        hobby: request.body.hobby,
        movie: request.body.movie,
        series: request.body.series,
        game: request.body.game,
    };
    console.log(request.params.id);

    User.findByIdAndUpdate(request.params.id, {$set: user}, {new: true}, (error, doc) => {
        if (!error)
            response.send(doc);
        else
            console.log('Error in user update :' + JSON.stringify(error, undefined, 2));
    });
});

module.exports = router;