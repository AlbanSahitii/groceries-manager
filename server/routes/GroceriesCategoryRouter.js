const express = require("express");
const GroceriesCategoryRouter = express.Router();
const Middleware = require("../middleware/Middleware");
const tryCatch = require("../utils/tryCatch");

const GroceriesCategoryController = require("../controllers/Groceries/GroceriesCategoryController");

GroceriesCategoryRouter.post(
  "/create",
  tryCatch(GroceriesCategoryController.create)
);
GroceriesCategoryRouter.get("/get", tryCatch(GroceriesCategoryController.get));
GroceriesCategoryRouter.put(
  "/update",
  tryCatch(GroceriesCategoryController.update)
);
GroceriesCategoryRouter.delete(
  "/delete",
  tryCatch(GroceriesCategoryController.delete)
);
GroceriesCategoryRouter.use(Middleware.errorHandler);
module.exports = GroceriesCategoryRouter;
