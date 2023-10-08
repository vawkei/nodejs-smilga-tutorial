const path = require("path");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

//This is for uploading to my local drive and not to cloud:
const uploadProductImageLocal = async (req, res) => {
  //console.log(req.files)

  if (!req.files) {
    return res.status(400).json({ msg: "No file upLoaded" });
  }

  let productImage = req.files.image;

  if (!productImage.mimetype.startsWith("image")) {
    return res.status(400).json({ msg: "Please upLoad an image" });
  }

  const maxSize = 1024 * 1024;
  if (productImage.size > maxSize) {
    return res.status(400).json({ msg: "Please upLoad image < 1kb" });
  }

  const imagePath = path.join(
    __dirname,
    "../public/uploads/" + `${productImage.name}`
  );
  await productImage.mv(imagePath); // this code sends an image into the public folder that contains the browser-app. etc. we created a folder in the public folder called uploads. And when we enter localhost:3000/api/v1/products/uploads and click send from postman, the image goes into the folder. thats after some postman gymnastics

  //res.send("upload Product Image");
  return res
    .status(200)
    .json({ image: { src: `/uploads/${productImage.name}` } });
  // http://localhost:3000/uploads/computer-1.jpeg: i geta pic of a computer in the browser. "/uploads/computer-1.jpeg"
};

const uploadProductImage = async (req, res) => {
  //console.log(req.files.image);
  const result = await cloudinary.uploader.upload(
    req.files.image.tempFilePath,
    { use_filename: true, folder: "john-smilga-file-upload" }
  );
  //console.log(result)
  fs.unlinkSync(req.files.image.tempFilePath)
  res.status(200).json({image:{src:result.secure_url}})
};

module.exports = { uploadProductImage };

//This is for uploading to my local drive and not to cloud:

//All fo the above are done so as to get a link for our image that will be in image type :String which is set in our model.:we are meant to get this:{
//     "image": {
//       "src": "/uploads/computer-6.jpeg"
//   }
// } then copy the link.
