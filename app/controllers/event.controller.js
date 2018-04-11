const EventTang = require('../models/event.model.js');

exports.create = (req,res) => {

  if (typeof req.body !== "object" || !req.body.description || !req.body.name || !req.body.start_time) {
    console.log("Can't create event, malformed EventTang object");
    return res.status(400).send({error: "Invalid event object"});
  }

  const singleEvent = new EventTang({
    start_time: req.body.start_time || "blank",
    name: req.body.name || "blank",
    description: req.body.description || "blank"
  });

  singleEvent.save()
  .then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({message: err.message || "some error creating event"});
  });

};


exports.findAll = (req,res) => {

  EventTang.find()
  .then(events => {
    res.send(events);
  }).catch(err => {
    res.status(500).send({message: err.message || "some error retrieving event"});
  });


};


exports.findOne = (req,res) => {
  return res.status(500).send({message: "not yet implemented"});
};


exports.update = (req,res) => {

  if (!req.body.description) {
    return res.status(400).send({message: "Event description can't be empty"});
  }

  EventTang.findByIdAndUpdate(req.params.eventId, {
    start_time: req.body.start_time || "blank",
    name: req.body.name || "blank",
    description: req.body.description || "blank"
  }, {new: true})
  .then(singleEvent => {
    if (!singleEvent) {
      return res.status(404).send({
        message: "Can't find ID: " + req.params.eventId
      });
    }
    res.send(singleEvent);
  }).catch(err => {
    if (err.kind === "ObjectId") {
      return res.status(404).send({
        message: "Can't find ID: " + req.params.eventId
      });
    }
    return res.status(500).send({
      message: "Error updating ID: " + req.params.eventId
    });
  });
};

exports.delete = (req,res) => {
  EventTang.findByIdAndRemove(req.params.eventId)
  .then(singleEvent => {
    if (!singleEvent) {
      return res.status(404).send({
        message: "Can't find ID: " + req.params.eventId
      });
    }
    res.send({message: "deleted"});
  }).catch(err => {
    if (err.kind === "ObjectId" || err.name === "NotFound") {
      return res.status(404).send({
        message: "Can't find ID: " + req.params.eventId
      });
    }
    return res.status(500).send({
      message: "Can't delete ID: " + req.params.eventId
    });
  });

};
