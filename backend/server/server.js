// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

// 2nd part -- connect database and add data table
var User     = require('../models/user');

var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost:27017/user');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    next();
});
// 2nd part

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// 2nd part -- add actual routing
// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

// more routes for our API will happen here
// 2nd part

// 3rd part - insert a user POST
// on routes that end in /users
// ----------------------------------------------------

    // create a user (accessed at POST http://localhost:8080/api/users)
router.post('/users', function(req, res) {
        
        var user = new User();      // create a new instance of the User model
        user.firstname = req.body.firstname;  // set the users firstname (comes from the request)
        user.lastname = req.body.lastname;  // set the users lastname (comes from the request)
        user.sex = req.body.sex;  // set the users sex (comes from the request)
        user.age = req.body.age; // set the users age (comes from the request)v
        if (req.body.password !== "") {
          user.password = req.body.password; // set the users password (comes from the request)
        }
       
        // save the user and check for errors
        user.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'User created!' });
        });
        
    })
	//;
// 3rd part

// 4th part -- get the user list
// get all the user (accessed at GET http://localhost:8080/api/users)
router.get('/users', function(req, res) {
        User.find(function(err, users) {
            if (err)
                res.send(err);

            res.status(200).json(users);
        });
    });
// 4th part

// 5th part - access an individual user
// on routes that end in /users/:user_id
// ----------------------------------------------------
router.route('/users/:user_id')

    // get the user with that id (accessed at GET http://localhost:8080/api/users/:user_id)
    .get(function(req, res) {
        User.findById(req.params.user_id, function(err, user) {
            if (err)
                res.send(err);
            res.json(user);
        });
    })
	//;
// 5th part

// 6th part -- update
// update the user with this id (accessed at PUT http://localhost:8080/api/users/:user_id)
    .put(function(req, res) {

        // use our user model to find the user we want
        User.findById(req.params.user_id, function(err, user) {

            if (err)
                res.send(err);

            if (typeof(req.body.firstname) !== "undefined") {
                user.firstname = req.body.firstname;  // update the users info
                console.log(req.body.firstname);
            }
            if (typeof(req.body.lastname) !== "undefined") {
                user.lastname = req.body.lastname;  // update the users info
            }
            if (typeof(req.body.sex) !== "undefined") {
                user.sex = req.body.sex;  // update the users info
            }
            if (typeof(req.body.age) !== "undefined") {
                user.age = req.body.age;  // update the users info
            }
            if (typeof(req.body.password) !== "undefined") {
                user.password = req.body.password;  // update the users info
            }
           
            // save the user
            user.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'User updated!' });
                
            });

        });
    })
	//;
// 6th part

// 7th part - delete
// delete the user with this id (accessed at DELETE http://localhost:8080/api/users/:user_id)
    .delete(function(req, res) {
        User.remove({
            _id: req.params.user_id
        }, function(err, user) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });
// 7th part 

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);


// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
