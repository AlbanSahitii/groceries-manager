const express = require('express');
const FamilyRouter = express.Router()


const FamilyController = require('../controllers/Family/FamilyController.js')

FamilyRouter.post('/create', FamilyController.create)
FamilyRouter.post('/get', FamilyController.get)


module.exports = FamilyRouter