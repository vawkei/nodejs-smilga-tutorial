const authorize = (req, res, next) => {
  const {name} = req.query;
  //when i type http://localhost:5000/?name=voke in the browser i get:{ name: 'voke' }
  // so we destructure the name.
  if(name ==="voke"){
    next()
    //if the query name is equal to voke, we proceed, or else, it spits back unauthorized
  }else{
    res.send("<h1>UnAuthorized</h1>")
  }
  console.log("authorize");
  next();
};

module.exports = authorize;
