const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 7000;

require('./src/db/connection.js');
const Register = require("./src/models/userSchema");

const homeRoutes = require('./routes/home');
const registerRoutes = require('./routes/register.js');
const loginRoutes = require('./routes/login.js')


const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));


app.use("/", homeRoutes);

app.post("/sign_up", registerRoutes);

app.post('/log_in', loginRoutes);


app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});