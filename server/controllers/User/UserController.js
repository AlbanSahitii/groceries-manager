const UserServices = require("../../services/UserService");

class UserController {
  static register = async (req, res, next) => {
    const result = await UserServices.registerUser(req, res, next);
    res.json(result);
  };

  static login = async (req, res, next) => {
    const result = await UserServices.loginUser(req, res, next);
    res.send(result);
  };

  static delete = async (req, res, next) => {
    const result = await UserServices.deleteUser(req, res, next);
    res.json(result);
  };

  static update = async (req, res, next) => {
    const result = await UserServices.updateUser(req, res, next);
    res.json(result);
  };

  static validateUser = async (req, res, next) => {
    const result = await UserServices.validateUser(req, res, next);
    res.json(result);
  };

  static getUser = async (req, res, next) => {
    const result = await UserServices.getUser(req, res, next);
    res.json(result);
  };
}

module.exports = UserController;
