const express = require('express');
const router = express.Router();
const path = require('path');

const Register = require(path.resolve('./src/models/userSchema'));

router.post("/sign_up", async (req, res) => {
    try {
            const password =  req.body.Password;
            const name =  req.body.Name;
            const email =  req.body.Email;
            
            const RegisterUser = new Register({
              Name: name,
              Email: email,
              Password: password
            })
  
            const registered = await RegisterUser.save();
            
            res.sendFile(path.resolve('views/log_in.html'));
            
    } catch (error) {
            res.status(400).send(error);
    }
  })


module.exports = router;