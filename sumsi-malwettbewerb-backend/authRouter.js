const express = require('express');
const router = express.Router();
const authMan = require("./utility/AuthenticateTokenManager");
const UserMan = require('./utility/UserManager.js');

// login endpoint
router.post('/', async (req,res)=>{
    const email = req.body.email ;
    const password = req.body.password ;
     if(email == null || password == null)
     {
     return    res.status(400).json({
            status:"failed",
            status_code:400,
            message:"username and password are required"
         })
     }
    const isAuthorized = await  UserMan.HasAdminRole(email,password);
   
     if(isAuthorized ===true)
     {
        const token = authMan.generateAccessToken(email,password);

        return res.status(200).json({
            status:"success",
            status_code :200,
            token
        })
     }
   
     return res.status(401).json({
       status:'falied',
       status_code:401,
       error:'your credential is not valid'
     })
});

module.exports = router ;