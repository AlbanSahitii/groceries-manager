const express = require("express");
const PurchasedGroceriesRouter = express.Router();
const Middlware = require("../middleware/Middleware");
const tryCatch = require("../utils/tryCatch");

const PurchasedGroceriesController = require("../controllers/Groceries/PurchasedGroceriesController");

PurchasedGroceriesRouter.get(
  "/get",
  tryCatch(PurchasedGroceriesController.get)
);
PurchasedGroceriesRouter.put(
  "/update",
  tryCatch(PurchasedGroceriesController.update)
);
PurchasedGroceriesRouter.delete(
  "/delete",
  tryCatch(PurchasedGroceriesController.delete)
);
PurchasedGroceriesRouter.post(
  "/create",
  tryCatch(PurchasedGroceriesController.create)
);
PurchasedGroceriesRouter.use(Middlware.errorHandler);

module.exports = PurchasedGroceriesRouter;
