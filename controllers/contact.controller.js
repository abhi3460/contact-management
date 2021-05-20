const crypto = require('crypto');
const db = require("../models");
const Contact = db.contacts;

// Create and Save a new Contact
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  let { firstName, lastName, email, username, password, confPass, phone, address } = req.body;

  // Create a Contact
  if (password === confPass) {
    // Create password hash after comparing pass and confirm pass
    let salt = crypto.randomBytes(16).toString('hex'); 
    let hash = crypto.pbkdf2Sync(password, salt,  
      1000, 64, `sha512`).toString(`hex`);

    const contact = new Contact({
      firstName,
      lastName,
      email,
      username,
      password: hash,
      phone,
      address
    });
    // Save Contact in the database
    contact
      .save(contact)
      .then(data => {
        res.send({
          contacts: data
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the contact."
        });
      });
  }

};

// Retrieve all Contacts from the database.
exports.findAll = (req, res) => {
  const email = req.query.email;
  var condition = email ? { email: { $regex: new RegExp(email) } } : {};

  Contact.find(condition)
    .then(data => {
      res.send({
        contacts: data
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving contacts."
      });
    });
};

// Find a single Contact with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Contact.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Contact with id " + id });
      else res.send({
        contacts: data
      });
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Contact with id=" + id });
    });
};

// Update a Contact by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;
  console.log(id);

  Contact.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Contact with id=${id}. Maybe Contact was not found!`
        });
      } else res.send({ message: "Contact was updated successfully.", contacts: data });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Contact with id=" + id
      });
    });
};

// Delete a Contact with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Contact.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Contact with id=${id}. Maybe Contact was not found!`
        });
      } else {
        res.send({
          message: "Contact was deleted successfully!",
          contacts: data
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Contact with id=" + id
      });
    });
};
