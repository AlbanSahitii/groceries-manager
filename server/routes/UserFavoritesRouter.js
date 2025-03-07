const express = require("express");
const UserFavoritesRoutes = express.Router();
const Middlware = require("../middleware/Middleware");
const tryCatch = require("../utils/tryCatch");
const UserFavoritesController = require("../controllers/User/UserFavoritesController");

UserFavoritesRoutes.post("/create", tryCatch(UserFavoritesController.create));
UserFavoritesRoutes.get("/get", tryCatch(UserFavoritesController.get));
UserFavoritesRoutes.put("/update", tryCatch(UserFavoritesController.get));
UserFavoritesRoutes.delete("/delete", tryCatch(UserFavoritesController.get));
UserFavoritesRoutes.use(Middlware.errorHandler);
module.exports = UserFavoritesRoutes;
