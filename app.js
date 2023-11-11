const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 7000;

require('./src/db/connection.js');
const Register = require("./src/models/userSchema");

const homeRoutes = require('./routes/home');
//const userRoutes = require('./routes/user');


const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));


app.use("/", homeRoutes);

app.post('/sign_up', async (req, res) => {
  try {
          const password =  req.body.Password;
          const name =  req.body.Name;
          const email =  req.body.Email;
          console.log(password);
          console.log(name);
          console.log(email);
          const RegisterUser = new Register({
            Name: name,
            Email: email,
            Password: password
          })

          const registered = await RegisterUser.save();
          //res.send(RegisterUser);
          res.sendFile("index.html", { root: path.join(__dirname, "views") });
          
  } catch (error) {
          res.status(400).send(error);
  }
})



app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});