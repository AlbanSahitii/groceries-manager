const UserServices = require('../../services/UserService.js')

class UserController {

    static register = async(req,res) => {
        const result = await UserServices.registerUser()
        res.json(result)
    }

}

module.exports = UserController