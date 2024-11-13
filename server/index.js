const express = require('express');
require('dotenv').config();
const app = express();
app.use(express.json());
const PORT = process.env.PORT;

// router imports
const userRoutes = require('./routes/UserRoutes.js');
const familyRoutes = require('./routes/FamilyRoutes.js')

app.use('/api/user', userRoutes);
app.use('/api/family', familyRoutes)



const db = require('./models')

// Start the server
db.sequelize.sync(/*{ alter: true }*/).then((req) => {  
  app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
  });
})