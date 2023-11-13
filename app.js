const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 7000;

require('./src/db/connection.js');
const Register = require("./src/models/userSchema");

const homeRoutes = require('./routes/home');
const registerRoutes = require('./routes/register.js');
const loginRoutes = require('./routes/login.js');
const addUserRoutes = require('./routes/addUser.js');


const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));


app.use("/", homeRoutes);

app.post("/sign_up", registerRoutes);

app.post('/log_in', loginRoutes);

app.post('/addUser', addUserRoutes);

app.get('/documentCount', async (req, res) => {
    try {
      // Use the .countDocuments() method to get the count of documents in the collection
      const count = await Register.countDocuments();
      res.json({ count }); // Send the count as JSON response
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send('Internal Server Error');
    }
  });
  
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});