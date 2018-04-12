const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// const preVerifyBuf = (buf) => {
//   for (i=1;i<buf.length-1;i++) {
//     if (buf[i] == 123 || buf[i] == 125) {
//         return true
//     }
//   }
//   return false
// };

// const verifyBuf = (req,res,buf) => {
//   if (!buf || !buf.length || buf[0] !== 123 || buf[buf.length-1] !== 125 || preVerifyBuf(buf)) {
//     res.status(500).send({"error":"JSON appears invalid"});
//     throw new Error("Request content failed verify");
//   }
//
// }


app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json({
  verify: function(req,res,buf) {
    // verifyBuf(req,res,buf)
    //to do: just try and parse the buffer as JSON. This is ugly.
  }
}));
  // function(req, res, buf, encoding) {
  //   if (!buf || !buf.length || buf[0] !== 123 || buf[buf.length-1] !== 125 || preVerifyBuf(buf)) {
  //     res.status(500).send({"error":"JSON appears invalid"});
  //     throw new Error("Request content failed verify");
  //     }
  //   }


app.use(bodyParser.text());

// app.use(bodyParser.raw());

const dbConfig = require("./config/db.config.js");
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url)
.then(() => {
  console.log("Connected to DB");
}).catch(err => {
  console.log("Error connecting to DB, exiting");
  process.exit();
});



require('./app/routes/event.routes.js')(app);
require('./app/routes/user.routes.js')(app);

app.listen(3333, function() {
  console.log("server is listening");
})
