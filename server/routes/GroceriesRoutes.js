const express = require('express')
const GroceriesRoutes = express.Router()
const Middleware = require('../middleware/Middleware')

const GroceriesController = require('../controllers/Groceries/GroceriesController')

GroceriesRoutes.post('/create', GroceriesController.create)
GroceriesRoutes.get('/get', GroceriesController.get)
GroceriesRoutes.put('/update', GroceriesController.update)
GroceriesRoutes.delete('/delete', GroceriesController.delete)


module.exports = GroceriesRoutes