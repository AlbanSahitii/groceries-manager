const cors = require("cors");
const express = require("express");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const PORT = process.env.PORT;
const HOST = process.env.HOST;
const app = express();

// router imports
const userRouter = require("./routes/UserRouter.js");
const familyRouter = require("./routes/FamilyRouter.js");
const groceriesRouter = require("./routes/GroceriesRouter.js");
const groceriesCategoryRouter = require("./routes/GroceriesCategoryRouter.js");
const userFavoritesRouter = require("./routes/UserFavoritesRouter.js");
const familyGrocerier = require("./routes/FamilyGroceriesRouter.js");
const purchasedGroceries = require("./routes/PurchasedGroceriesRouter.js");
const testRouter = require("./routes/TestRouter.js");
const Middleware = require("./middleware/Middleware.js");

app.use(cookieParser());
app.use(express.json());
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

app.use(cors(corsOptions));
app.use("/api/user", userRouter);
app.use("/api/family", familyRouter);
app.use("/api/groceries", groceriesRouter);
app.use("/api/groceries_category", groceriesCategoryRouter);
app.use("/api/user_favorites", userFavoritesRouter);
app.use("/api/family_groceries", familyGrocerier);
app.use("/api/purchased_groceries", purchasedGroceries);
app.use("/test", Middleware.errorHandler, testRouter);

const db = require("./models");

// Start the server
db.sequelize.sync(/*{ alter: true }*/).then(req => {
  app.listen(PORT, () => {
    console.log(`Server is running on ${HOST}:${PORT}`);
  });
});
