const jwt = require('jsonwebtoken');

authenticateToken = (req, res, next) => {
    const authenticationHeader = req.headers['authorization'];
    const token = authenticationHeader && authenticationHeader.split(' ')[1];

    if(!token || token == null){
        return res.status(400).json({error:"unauthorized request"})
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (err, verified) => {
        if(err){
            return res.status(400).json({error: "invalid or expired token"})
        }
        else{
            req.loginUser = verified
            next()
        }
    })
}

module.exports = authenticateToken