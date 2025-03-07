const express = require("express");
const TestRouter = express.Router();
const Middleware = require("../middleware/Middleware");
const TestController = require("../controllers/TestController");

TestRouter.post("/testError", TestController.test);
TestRouter.use(Middleware.errorHandler);

module.exports = TestRouter;
