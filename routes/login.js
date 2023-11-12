const express = require('express');
const router = express.Router();
const path = require('path');

const Register = require(path.resolve('./src/models/userSchema'));

router.post('/log_in', async (req, res) => {
    try {   
            const adminEmail = "admin@gmail.com";
            const password =  req.body.Password;
            const email =  req.body.Email;
            
            const userEmail = await Register.findOne({Email:email});
  
            if(!userEmail){
              res.send(`<script>
                          alert('Create a Account First');
                          window.location.href = '/sign_up.html'; // Redirect back to the login page
                          </script>
                      `); 
            }else if(userEmail.Password === password){
              if(userEmail.Email === adminEmail){
                res.sendFile(path.resolve('views/admin.html'));
              }else{
                res.sendFile(path.resolve('views/home.html'));
              } 
            }else{
              res.send(`<script>
                          alert('Login failed. Please try again.');
                          window.location.href = '/log_in.html'; // Redirect back to the login page
                          </script>
                      `);            
            }        
    } catch (error) {
            res.send(error);
    }
  })


module.exports = router;