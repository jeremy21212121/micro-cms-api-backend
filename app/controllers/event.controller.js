const EventTang = require('../models/event.model.js');

//helper functions
const isInvalidEventTangObj = (req) => {

  if ( req.body.length !== 1
    || !req.body.description
    || !req.body.name
    || !req.body.start_time ) {
      return true;
  } else {
    return false;
  }
}
/////

exports.create = (req,res) => {

  if (isInvalidEventTangObj(req)) {
    console.log("Can't create event, malformed EventTang object");
    return res.status(400).send({error: "Invalid event object"});
  }

  const singleEvent = new EventTang({
    start_time: req.body.start_time,
    name: req.body.name,
    description: req.body.description
  });

  singleEvent.save()
  .then(data => {
    res.send(data);
  }).catch(err => {
    console.log("Error saving event:" + err.message)
    res.status(500).send({error: err.message || "some error saving event"});
  });

};


exports.findAll = (req,res) => {

  EventTang.find()
  .then(events => {
    res.send(events);
  }).catch(err => {
    res.status(500).send({error: err.message || "some error retrieving event"});
  });


};


exports.findOne = (req,res) => {
  return res.status(500).send({error: "not yet implemented"});
};


exports.update = (req,res) => {

  if ( isInvalidEventTangObj(req) ) {
    return res.status(400).send({error: "Invalid event object"});
  }

  EventTang.findByIdAndUpdate(req.params.eventId, {
    start_time: req.body.start_time,
    name: req.body.name,
    description: req.body.description
  }, {new: true})
  .then(singleEvent => {
    if (!singleEvent) {
      return res.status(404).send({
        error: "Can't find ID: " + req.params.eventId
      });
    }
    res.send(singleEvent);
  }).catch(err => {
    if (err.kind === "ObjectId") {
      return res.status(404).send({
        error: "Can't find ID: " + req.params.eventId
      });
    }
    return res.status(500).send({
      error: "Error updating ID: " + req.params.eventId
    });
  });
};

exports.delete = (req,res) => {
  EventTang.findByIdAndRemove(req.params.eventId)
  .then(singleEvent => {
    if (!singleEvent) {
      return res.status(404).send({
        error: "Can't find ID: " + req.params.eventId
      });
    }
    res.send({message: "deleted"});
  }).catch(err => {
    if (err.kind === "ObjectId" || err.name === "NotFound") {
      return res.status(404).send({
        error: "Can't find ID: " + req.params.eventId
      });
    }
    return res.status(500).send({
      error: "Can't delete ID: " + req.params.eventId
    });
  });

};
