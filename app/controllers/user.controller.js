const User = require('../models/user.model.js');

exports.create = (req,res) => {

  // var user = new User({
  //   username: req.body.username,
  //   password: req.body.password
  // });
  //
  // user.save( (err) => {
  //   if (err) {
  //     console.log("error saving user: " + user.username + " - error msg: " + err.message);
  //     return res.status(500).send({error: err.message || "Error saving user"});
  //   }
  //   res.send({ message: "Added user: " + user.username });
  // });


  if (!req.body.username || !req.body.password) {
    console.log("Can't create user, malformed user object");
    return res.status(400).send({error: "Invalid user object"});
  }

  const user = new User({
    username: req.body.username,
    password: req.body.password
  });

  user.save()
  .then(userData => {
    res.send({ message: "Added user: " + user.username });
  }).catch(err => {
    console.log("error saving user: " + user.username + " - error msg: " + err.message);
    return res.status(500).send({error: err.message || "Error saving user"});
  });


};


exports.findAll = (req,res) => {
  // User.find( (err,users) => {
  //   if (err) {
  //     console.log("Error finding users");
  //     return res.status(404).send({error: err.msg || "Can't find users"});
  //   }
  //   res.send(users);
  // });

  User.find()
  .then(users => {
    res.send(users);
  }).catch(err => {
    console.log("Error finding users: " + err.message);
    res.status(500).send({error: err.message || "some error finding users"});
  });


};
