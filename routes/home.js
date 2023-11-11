const express = require('express');
const router = express.Router();
const path = require('path');

router.get("/", (req, res) => {  
        res.sendFile("sign_up.html", { root: path.join(__dirname, "../views") });
});

//post database


module.exports = router;