const db = require("../models");
const Slot = db.slot

exports.create = (req, res) => {
    if (!req.body.time || !req.body.location) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
      }
    
    const slot = new Slot({
      time: req.body.time,
      location: req.body.location,
      type:"ha",
      booked: req.body.booked ? req.body.booked : false,
      reference:null,
    });

    slot
    .save(slot)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Slot."
      });
    });
  
};

exports.findAll = (req, res) => {
  const type = "ha";
  var condition = type ? { type: { $regex: new RegExp(type), $options: "i" } } : {};
  Slot.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving slots."
      });
    });
  
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  SLot.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Slot with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving SLot with id=" + id });
    });
  
};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Slot.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Slot with id=${id}. Maybe SLot was not found!`
        });
      } else res.send({ message: "Slot was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Slot with id=" + id
      });
    });
};


exports.delete = (req, res) => {
  const id = req.params.id;

  Slot.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Slot with id=${id}. Maybe Slot was not found!`
        });
      } else {
        res.send({
          message: "Slot was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Slot with id=" + id
      });
    });
  
};

exports.deleteAll = (req, res) => {
    Slot.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Slot were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all slots."
      });
    });
};

exports.findAllAvailable = (req, res) => {
    Slot.find({ booked: false })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving all available slots."
      });
    });
};
