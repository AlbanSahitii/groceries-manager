const express = require("express");
const GroceriesRoutes = express.Router();
const Middleware = require("../middleware/Middleware");
const tryCatch = require("../utils/tryCatch");
const GroceriesController = require("../controllers/Groceries/GroceriesController");
const {groceriesSchema} = require("../validation");

GroceriesRoutes.post(
  "/create",
  Middleware.jwtAuth,
  Middleware.validateRequest(groceriesSchema.create),
  tryCatch(GroceriesController.create)
);
GroceriesRoutes.get(
  "/get",
  Middleware.jwtAuth,
  Middleware.validateQuery(groceriesSchema.get),
  tryCatch(GroceriesController.get)
);
GroceriesRoutes.put(
  "/update",
  Middleware.jwtAuth,
  Middleware.validateRequest(groceriesSchema.update),
  tryCatch(GroceriesController.update)
);
GroceriesRoutes.delete(
  "/delete",
  Middleware.jwtAuth,
  Middleware.validateRequest(groceriesSchema.delete),
  tryCatch(GroceriesController.delete)
);
GroceriesRoutes.post(
  "/add_grocerie_in_list",
  Middleware.jwtAuth,
  Middleware.validateRequest(groceriesSchema.addGrocerieInList),
  tryCatch(GroceriesController.addGrocerieInList)
);
GroceriesRoutes.get(
  "/get_family_grocery_list",
  Middleware.jwtAuth,
  Middleware.validateQuery(groceriesSchema.getFamilyGroceryList),
  tryCatch(GroceriesController.getFamilyGroceryList)
);
GroceriesRoutes.post(
  "/purchase_grocery",
  Middleware.jwtAuth,
  Middleware.validateRequest(groceriesSchema.purchaseGrocery),
  tryCatch(GroceriesController.purchaseGrocery)
);
GroceriesRoutes.post(
  "/get_last_ten_groceries",
  Middleware.jwtAuth,
  Middleware.validateRequest(groceriesSchema.getLastTenGroceries),
  tryCatch(GroceriesController.getLastTenGroceries)
);
GroceriesRoutes.use(Middleware.errorHandler);

module.exports = GroceriesRoutes;
