// const CustomAPIError = require('../errors/custom-error')
// const errorHandlerMiddleware = (err, req, res, next) => {
//   if (err instanceof CustomAPIError) {
//     return res.status(err.statusCode).json({ msg: err.message })
//   }
//   return res.status(500).send('Something went wrong try again later')
// }

// module.exports = errorHandlerMiddleware

const {StatusCodes} = require("http-status-codes");

const errorHandlerMiddleware = (err,req,res,next)=>{
  console.log(err)
  //return res.status(500).json("Something went wrong")
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json("Something went wrong")
}

module.exports = errorHandlerMiddleware