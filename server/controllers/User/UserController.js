const UserServices = require('../../services/UserService.js')

class UserController {

    static register = async(req,res) => {
        const result = await UserServices.registerUser(req,res)
        res.json(result)
    }

    static login = async(req,res) => {
        const result = await UserServices.loginUser(req,res)
        res.json(result)
    }

    static delete = async(req,res) => {
        const result = await UserServices.deleteUser(req,res)
        res.json(result)
    }
}

module.exports = UserController