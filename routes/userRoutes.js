const express = require('express')
const router = express.Router()
const getUser = require("../controllers/userController")
const validateToken = require('../middleware/validateTokenHandler')

router.post('/register',getUser.registerUser)
router.post('/login',getUser.loginUser)
router.get('/current',validateToken, getUser.CurrentUser)

module.exports = router;

