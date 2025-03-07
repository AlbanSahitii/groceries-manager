const express = require("express");
const FamilyGroceriesRouter = express.Router();
const tryCatch = require("../utils/tryCatch");

const FamilyGroceriesController = require("../controllers/Family/FamilyGroceriesController");
const Middleware = require("../middleware/Middleware");

FamilyGroceriesRouter.get("/get", tryCatch(FamilyGroceriesController.get));
FamilyGroceriesRouter.delete(
  "/delete",
  tryCatch(FamilyGroceriesController.delete)
);
FamilyGroceriesRouter.post(
  "/create",
  tryCatch(FamilyGroceriesController.create)
);
FamilyGroceriesRouter.put(
  "/update",
  tryCatch(FamilyGroceriesController.update)
);
FamilyGroceriesRouter.use(Middleware.errorHandler);
module.exports = FamilyGroceriesRouter;
