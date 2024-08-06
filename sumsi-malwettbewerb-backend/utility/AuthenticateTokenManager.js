require('dotenv').config ;
const jwt = require('jsonwebtoken');

class AuthenticatTokenManager
{

     generateAccessToken(email , password) 
    {  
        const accessToken = jwt.sign( {name: email , pass:password}, process.env.TOKEN_SECRET, { expiresIn: 60 * 60*24});
        return accessToken ;
    }
  

     authenticateToken(req, res, next) 
     {
        
       
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
      
        if (token == null) return res.sendStatus(401)
      
        jwt.verify(token, process.env.TOKEN_SECRET , (err, user) => {
          if (err) return res.status(403).json({
            status:'failed',
            status_code:403,
            message:'not valid process'
          })
          req.user = user
       
          next()
        })
      }

}

const  man = new AuthenticatTokenManager();

module.exports = man;