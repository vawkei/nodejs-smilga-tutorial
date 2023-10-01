const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
 
 try{
  // console.log(req.body);
  // { name: 'joe', email: 'joe@gmail.com', password: 'secret' }

  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new Error(
      res.status(401).json({ msg: "Please provide name,email and password" })
    );
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const tempUser = { name, email, password: hashedPassword };

  //const newUser = await User.create({ ...req.body });
  const newUser = await User.create({ ...tempUser });

  const token = jwt.sign(
    { userId: newUser._id, name: newUser.name },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_LIFETIME }
  );

  
  res.status(201).json({ user: { name: newUser.name }, token });
  //What we get in postman when we click send   {
  //     "user": {
  //         "name": "joe4"
  //     },
  //     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuZXdVc2VyIjoiNjUxNjg5NGM5MzdiNGQ0OTc0MjViY2IzIiwibmFtZSI6ImpvZTQiLCJpYXQiOjE2OTU5NzU3NTgsImV4cCI6MTY5NjE0ODU1OH0.POEQYmg3nbwYr3qco5fxjr753zxjqUuaho3wsEZLw98"
  // }
 }catch(error){
  res.status(400).json(error)
 }
  //initially:res.send("Register user")
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    const errorResponse = { msg: "Please provide email and password" };
    res.status(401).json(errorResponse);
    return; // Return early to prevent further execution of the code
  }
  

  const user = await User.findOne({ email });

  if (!user) {
    const errorResponse = { msg: "Invalid Credentials" };
    res.status(401).json(errorResponse);
    return; // Return early to prevent further execution of the code
  }

  const verifyPassword = async(oldPassword,passwordInDB)=>{
    const isValid = await bcrypt.compare(oldPassword,passwordInDB);
    return isValid
  } 

  const isPasswordCorrect = await verifyPassword(password,user.password)

  
  if (!isPasswordCorrect) {
    const errorResponse = { msg: "Invalid Credentials" };
    res.status(401).json(errorResponse);
    return; // Return early to prevent further execution of the code
  }

  const token = jwt.sign(
    { user: user._id, name: user.name },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_LIFETIME }
  );



  //initilly:res.send("login user");

  res.status(201).json({ user: { name: user.name }, token });
};

module.exports = { register, login };
