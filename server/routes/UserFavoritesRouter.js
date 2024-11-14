const express = require('express')
const UserFavoritesRoutes = express.Router()
const Middlware = require('../middleware/Middleware');

const UserFavoritesController = require('../controllers/User/UserFavoritesController')

UserFavoritesRoutes.post('/create', UserFavoritesController.create)
UserFavoritesRoutes.get('/get', UserFavoritesController.get)
UserFavoritesRoutes.put('/update', UserFavoritesController.get)
UserFavoritesRoutes.delete('/delete', UserFavoritesController.get)

module.exports = UserFavoritesRoutes