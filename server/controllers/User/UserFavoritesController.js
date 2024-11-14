const UserFavoritesServies = require('../../services/UserFavoritesServices')


class UserFavoritesController {
    static get = async (req,res) => {
        const result = await UserFavoritesServies.getUserFavorite(req,res)
        res.json(result)
    }
    static create = async (req,res) => {
        const result = await UserFavoritesServies.createUserFavorite(req,res)
        res.json(result)
    }
    static update = async (req,res) => {
        const result = await UserFavoritesServies.updateUserFavorite(req,res)
        res.json(result)
    }
    static delete = async (req,res) => {
        const result = await UserFavoritesServies.deleteUserFavorite(req,res)
        res.json(result)
    }
}

module.exports = UserFavoritesController