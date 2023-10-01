const {StatusCodes} = require("http-status-codes");
const jwt = require("jsonwebtoken");

const authenticationMiddleware =async (req,res,next)=>{
    //console.log(req.headers.authorization);
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(StatusCodes.UNAUTHORIZED).json({ msg: "No token provided" });
    }
  
    const token = authHeader.split(" ")[1];
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
        //in the terminal: { id: '26', username: 'voke', iat: 1695721595, exp: 1698313595 }

        const {id,username} = decoded;
        req.user = {id,username}
        next()
      } catch (error) {
        res.status(StatusCodes.UNAUTHORIZED).json({ msg: "Not authorized to access this route" });
        console.log(error);
      }
    
};

module.exports = authenticationMiddleware