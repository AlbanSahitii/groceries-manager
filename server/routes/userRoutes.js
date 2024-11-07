const express = require('express')
const router = express.Router()

const userController = require('../controllers/User/User.js')

router.post('/login', userController.login)


module.exports = router