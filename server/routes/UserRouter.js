const express = require("express");
const UserRouter = express.Router();

const Middleware = require("../middleware/Middleware");
const UserController = require("../controllers/User/UserController");

UserRouter.post("/register", UserController.register);
UserRouter.post("/login", UserController.login);
UserRouter.delete("/delete", UserController.delete);
UserRouter.put("/update", UserController.update);
UserRouter.post("/validateUser", UserController.validateUser);
UserRouter.get("/getUser", UserController.getUser);

module.exports = UserRouter;
