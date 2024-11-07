const express = require('express');
require('dotenv').config();
const app = express();
app.use(express.json());
const PORT = process.env.PORT;

// router imports
const userRoutes = require('./routes/UserRoutes.js');

app.use('/api/user', userRoutes);



const db = require('./models')

// Start the server
db.sequelize.sync().then((req) => {  
  app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
  });
})