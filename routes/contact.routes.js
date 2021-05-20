module.exports = app => {
  const contacts = require("../controllers/contact.controller");

  var router = require("express").Router();

  // Create a new Contact
  router.post("/", contacts.create);

  // Retrieve all Contacts
  router.get("/", contacts.findAll);

  // Retrieve a single Contact with id
  router.get("/:id", contacts.findOne);

  // Update a Contact with id
  router.patch("/:id", contacts.update);

  // Delete a Contact with id
  router.delete("/:id", contacts.delete);

  app.use("/api/contacts", router);
};
