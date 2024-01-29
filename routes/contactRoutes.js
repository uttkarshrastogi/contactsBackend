const express = require('express')
const router = express.Router();
const getContact = require("../controllers/contactController");
const validateToken = require('../middleware/validateTokenHandler');
router.use(validateToken)
router.route("/").get(getContact.getContacts).post(getContact.createContact);
router.route("/:id").get(getContact.getContactById).put(getContact.updateContact).delete(getContact.deleteContact)
module.exports = router;