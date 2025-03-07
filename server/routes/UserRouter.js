const express = require("express");
const UserRouter = express.Router();
const Middleware = require("../middleware/Middleware");
const UserController = require("../controllers/User/UserController");
const tryCatch = require("../utils/tryCatch");
const {userSchema} = require("../validation");

UserRouter.post(
  "/register",
  Middleware.validateRequest(userSchema.register),
  tryCatch(UserController.register)
);
UserRouter.post(
  "/login",
  Middleware.validateRequest(userSchema.login),
  tryCatch(UserController.login)
);
UserRouter.delete(
  "/delete",
  Middleware.jwtAuth,
  Middleware.validateRequest(userSchema.delete),
  tryCatch(UserController.delete)
);
UserRouter.put(
  "/update",
  Middleware.jwtAuth,
  Middleware.validateRequest(userSchema.update),
  tryCatch(UserController.update)
);
UserRouter.post(
  "/validateUser",
  Middleware.jwtAuth,
  Middleware.validateRequest(userSchema.validateUser),
  tryCatch(UserController.validateUser)
);
UserRouter.get(
  "/getUser",
  Middleware.jwtAuth,
  Middleware.validateQuery(userSchema.getUser),
  tryCatch(UserController.getUser)
);

UserRouter.use(Middleware.errorHandler);

module.exports = UserRouter;
