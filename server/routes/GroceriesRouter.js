const express = require('express')
const GroceriesRoutes = express.Router()
const Middleware = require('../middleware/Middleware')

const GroceriesController = require('../controllers/Groceries/GroceriesController')

GroceriesRoutes.post('/create', GroceriesController.create)
GroceriesRoutes.get('/get', GroceriesController.get)
GroceriesRoutes.put('/update', GroceriesController.update)
GroceriesRoutes.delete('/delete', GroceriesController.delete)
GroceriesRoutes.post('/add_grocerie_in_list', GroceriesController.addGrocerieInList)
GroceriesRoutes.get('/get_family_grocery_list', GroceriesController.getFamilyGroceryList)

module.exports = GroceriesRoutes