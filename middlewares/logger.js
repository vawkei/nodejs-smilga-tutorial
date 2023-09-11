const logger = (req,res,next) => {
    const url = req.url;
    const method = req.method;
    const date = new Date().getFullYear();
    console.log(url);
    console.log(method);
    console.log(date);
    next();
    //so when i go to home page i get this in the terminal: /,GET,2023
    //and when i go to about page i get this in the terminal: /about,GET,2023
  };

  module.exports = logger