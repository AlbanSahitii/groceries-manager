const express = require('express');
require('dotenv').config();
const app = express();
app.use(express.json());
const PORT = process.env.PORT;

// router imports
const userRoutes = require('./routes/UserRoutes.js');
const familyRoutes = require('./routes/FamilyRoutes.js')
const groceriesRoutes = require('./routes/GroceriesRoutes.js')
const groceriesCategoryRouter = require('./routes/GroceriesCategoryRouter.js')

app.use('/api/user', userRoutes);
app.use('/api/family', familyRoutes)
app.use('/api/groceries', groceriesRoutes)
app.use('/api/groceries_category', groceriesCategoryRouter)



const db = require('./models')

// Start the server
db.sequelize.sync(/*{ alter: true }*/).then((req) => {  
  app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
  });
})