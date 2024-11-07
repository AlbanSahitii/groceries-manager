const express = require('express');
require('dotenv').config();
const app = express();
app.use(express.json());
const PORT = process.env.PORT;

// router imports
const userRoutes = require('./routes/userRoutes.js');

app.use('/api/user', userRoutes);




// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
