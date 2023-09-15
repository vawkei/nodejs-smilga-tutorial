const express = require("express");
const router = express.Router()


router.post("/", (req, res) => {
    const { name } = req.body;
    if (name) {
      return res.status(200).send(`<h1>Welcome ${name} </h1>`);
    } else {
      res.status(404).send("<h1>Please Enter name</h1>");
      //if the input is empty we get [Object: null prototype] { name: '' }in the terminal
    }
  
    console.log(req.body);
    //here there in a form in the browser, the form has  <form action="/login" method="POST">. the action is stating where we are to go to afterclickin submit. the req.body works with the app.use(express.urlencoded({ extended: false })); which enables us to get the name typed in the input.
  });
  
  module.exports = router