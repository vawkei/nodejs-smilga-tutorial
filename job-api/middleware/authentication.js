const jwt = require("jsonwebtoken");

const authenticateUser =async (req, res, next) => {
  const authHeader = req.headers.authorization;
  //console.log(authHeader);

  if(!authHeader || !authHeader.startsWith("Bearer ")){
    res.status(401).json({msg:"Authentication invalid"})
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //console.log(decoded);
    // let { id, username } = decoded;
    req.user = { userId:decoded.userId, name:decoded.name };
    next();
  } catch (error) {
    res.status(401).json({ msg: "Not authorized to access this route." });
    console.log(error);
  }
};

module.exports = authenticateUser;