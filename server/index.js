const express = require('express');
require('dotenv').config();
const app = express();
app.use(express.json());
const PORT = process.env.PORT;

// router imports
const userRouter = require('./routes/UserRouter.js');
const familyRouter = require('./routes/FamilyRouter.js')
const groceriesRouter = require('./routes/GroceriesRouter.js')
const groceriesCategoryRouter = require('./routes/GroceriesCategoryRouter.js')
const userFavoritesRouter = require('./routes/UserFavoritesRouter.js')
const familyGrocerier = require('./routes/FamilyGroceriesRouter.js')
const purchasedGroceries = require('./routes/PurchasedGroceriesRouter.js')

app.use('/api/user', userRouter);
app.use('/api/family', familyRouter)
app.use('/api/groceries', groceriesRouter)
app.use('/api/groceries_category', groceriesCategoryRouter)
app.use('/api/user_favorites', userFavoritesRouter)
app.use('/api/family_groceries', familyGrocerier)
app.use('/api/purchased_groceries', purchasedGroceries)




const db = require('./models');
const FamilyGroceriesRouter = require('./routes/FamilyGroceriesRouter.js');

// Start the server
db.sequelize.sync(/*{ alter: true }*/).then((req) => {  
  app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
  });
})