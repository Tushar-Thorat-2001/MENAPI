const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

// ladel for api
// @dec Get all contacts
//  routes get/api/contacts
// @ access public

const getContact = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({});
  res.status(200).json(contacts);
});

// @dec post create contacts
//  routes post/api/contacts
// @ access public
const postContact = asyncHandler(async (req, res) => {
  console.log("This the body data", req.body);

  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    res.status(400);

    throw new Error(" all field is required");
  }

  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id: req.user_id,
  });
  res.status(200).json(contact);
});

// @dec Get contacts id
//  routes get/api/contacts/:id
// @ access public

const geContactID = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found ");
  }
  res.status(200).json(contact);
});

// @dec Update contacts
//  routes put/api/contacts/:id
// @ access public

const putContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found ");
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User don't have permission to update other user contacts");
  }

  const updateContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updateContact);
});

// @dec delete  contacts Id
//  routes delete/api/contacts/:id
// @ access public
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found ");
  }
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User don't have permission to update other user contacts");
  }

  await Contact.deleteOne({ _id: req.params.id });
  res.status(200).json(contact);
});

module.exports = {
  getContact,
  geContactID,
  postContact,
  putContact,
  deleteContact,
};
