const express = require('express')
const GroceriesCategoryRouter = express.Router()
const Middleware = require('../middleware/Middleware')

const GroceriesCategoryController = require('../controllers/Groceries/GroceriesCategoryController')

GroceriesCategoryRouter.post('/create', GroceriesCategoryController.create)
GroceriesCategoryRouter.get('/get', GroceriesCategoryController.get)
GroceriesCategoryRouter.put('/update', GroceriesCategoryController.update)
GroceriesCategoryRouter.delete('/delete', GroceriesCategoryController.delete)


module.exports = GroceriesCategoryRouter