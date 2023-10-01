//This was the original code before he refactored it after making the authentication middleware.

const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username.trim() || !password.trim()) {
    res.status(401).json({ msg: "Input fields shouldn't be empty" });
    return;
  }

  //just for demo, normally use database id
  const id = new Date().getDate().toLocaleString();

  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  console.log({ username: username, password: password }); // terminal:{ username: 'Voke', password: 'secret' }

  //res.send("Fake Login/Register/Signup");
  res.status(200).json({ msg: "user created", token });
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

  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ msg: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    //in the terminal: { id: '26', username: 'voke', iat: 1695721595, exp: 1698313595 }
    const luckyNumber = Math.floor(Math.random() * 100);
    res
      .status(200)
      .send({ msg: `Hello ${decoded.username}`, secret: `Here is your number ${luckyNumber}` });
  } catch (error) {
    res.status(401).json({ msg: "Not authorized to access this route" });
    console.log(error);
  }

  //  const luckyNumber = Math.floor(Math.random() * 100);
  //   res
  //     .status(400)
  //     .send({ msg: "Hello John", data: `Here is your number ${luckyNumber}` });
};

module.exports = { login, dashboard };
