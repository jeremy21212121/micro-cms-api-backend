const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const User = require('../models/user.model.js');

passport.use(new BasicStrategy(
  (username,password,callback) => {
    User.findOne({username: username})
    .then((user) => {
      user.verifyPassword(password, (error,matches) => {
        // if (error) { return callback(error); }
        if (!matches) { return callback(null,false); }
        return callback(null,user);
      })
    }).catch(err => {
      return callback(error);
    });
  }
));

exports.isAuthenticated = passport.authenticate('basic',{session: false});
