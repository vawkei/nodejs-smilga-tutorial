const mongoose = require("mongoose");



const connectDB = (url) => {
  return mongoose.connect(url, {
    // useNewUrlParser:true,
    // useCreateIndex:true,
    // useFindAndModify:false,
    // useUnifiedTopology:true
    //no need to write the 4 codes above in mongo version 6, but this is v5
  });  
};

module.exports = connectDB;

