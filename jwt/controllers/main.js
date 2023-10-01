//check username and password in login (post request).
// if exists, create new JWT.
// send back to frontend.
//setup authentication so that only the request with JWT can access the dashboard.
const {StatusCodes} = require("http-status-codes");

const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username.trim() || !password.trim()) {
    res.status(StatusCodes.UNAUTHORIZED).json({ msg: "Input fields shouldn't be empty" });
    return;
  }

  //just for demo, normally use database id
  const id = new Date().getDate().toLocaleString();

  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  console.log({ username: username, password: password }); // terminal:{ username: 'Voke', password: 'secret' }

  //res.send("Fake Login/Register/Signup");
  res.status(StatusCodes.OK).json({ msg: "user created", token });
  // when i enter my values in postman body after login in to localhost:3000/api/v1/login:
  //   i get in postman {
  //     "msg": "user created",
  //     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjI2IiwidXNlcm5hbWUiOiJ2b2tlIiwiaWF0IjoxNjk1NzE3ODE5LCJleHAiOjE2OTgzMDk4MTl9.RrsFnO98Pd4TC8KmRnyU-NJ2UHy0SBb2-P2Rl8zp_8A"
  // }
};

const dashboard = async (req, res) => {
  //console.log(req.headers);
  //we get in the console:
  //  authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjI2IiwidXNlcm5hbWUiOiJ2b2tlIiwiaWF0IjoxNjk1NzIxNTk1LCJleHAiOjE2OTgzMTM1OTV9.bbff-2u6aKDcchFK2Bie0ThJC15WykDjl19TWmEkd7k',

  //  const luckyNumber = Math.floor(Math.random() * 100);
  //   res
  //     .status(200)
  //     .send({ msg: "Hello John", data: `Here is your number ${luckyNumber}` });


  console.log(req.user) 
  const luckyNumber = Math.floor(Math.random() * 100);
  res
    .status(StatusCodes.OK)
    .send({
      msg: `Hello ${req.user.username}`,
      secret: `Here is your number ${luckyNumber}`,
    });
};

module.exports = { login, dashboard };
