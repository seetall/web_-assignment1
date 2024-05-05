const Contact = require('../models/contactModels');

const contacts = [];

const addContact = (req, res) => {
    const { name, phone, email } = req.body;
  
    // Validation
    if (!name || !phone || !email) {
      return res.status(400).json({ error: "All fields (name, phone, email) are required." });
    }
  
    if (contacts.some((contact) => contact.phone === phone)) {
      return res.status(400).json({ error: "Phone number already exists." });
    }
  
    const newContact = { name, phone, email };
    contacts.push(newContact);
    res.status(201).json({ contact: newContact, message: "Contact added successfully." });
  };
  
  module.exports = { addContact };
  