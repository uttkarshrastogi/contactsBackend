const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

//@desc Get all contacts
//@routes GET /api/contacts
//@access private
const getContacts = asyncHandler(async (req, res,next) => {
  const contacts = await Contact.find({user_id:req.user._id});
  // console.log(contacts)
  res.status(200).json(contacts);
});

//@desc Create a new contact
//@routes POST /api/contacts
//@access private
const createContact = asyncHandler(async (req, res) => {
  const requiredKeys = ["name", "email"];
  const missingKeys = requiredKeys.filter((key) => !(key in req.body));

  if (missingKeys.length > 0) {
    res.status(400);
    throw new Error(`Missing required keys: ${missingKeys.join(", ")}`);
    // const err = new Error(`Missing required keys: ${missingKeys.join(", ")}`);
    // res.status(400)
    // throw new Error("All fields are mandatory");
  } else {
    // Process the request here
    const { name, email, phone } = req.body;
    console.log(req.body);
    const contacts = await Contact.create({
      name,
      email,
      phone,
      user_id:req.user._id
    });
    res.status(201).json(contacts);
  }
});

//@desc Get a contact by ID
//@routes GET /api/contacts/:id
//@access private
const getContactById = asyncHandler(async (req, res) => {
  
  try {
    const contact = await Contact.findById(req.params.id);
     if (!contact) {
      res.status(404);
      throw new Error("Contact not found");
    }
    res.status(200).json(contact);
  } catch (error) {
    res.status(404);
    throw new Error("Contact not found");
  }
  
  
});
//@desc Update a contact by ID
//@routes PUT /api/contacts/:id
//@access private
const updateContact = asyncHandler(async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      res.status(404);
      throw new Error("Contact not found");
    }
    if(contact.user_id.toString() !== req.user._id){
      res.send(401)
      throw new Error("user dont have permission to update other user")
    }
    const updateContact = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      {new:true}
    )
    res.status(200).json(updateContact);
  } catch (error) {
    res.status(404);
    throw new Error("Contact not found");
  }
  
});
//@desc Delete a contact by ID
//@routes DELETE /api/contacts/:id
//@access private
const deleteContact = asyncHandler(async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      res.status(404);
      throw new Error("Contact not found");
    }
    if(contact.user_id.toString() !== req.user._id){
      res.send(401)
      throw new Error("user dont have permission to delete other user")
    }
    await contact.deleteOne({_id:req.params._id})
    res.status(200).json(contact);
  } catch (error) {
    res.status(404);
    throw new Error("contact not found");
  }
 
});

module.exports = {
  getContacts,
  createContact,
  getContactById,
  updateContact,
  deleteContact,
};
