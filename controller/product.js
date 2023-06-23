import multer from "multer";
import product from "../model/product.js";
import { productRepositories } from "../repositories/index.js";
import httpStatusCode from "../exception/HttpStatusCode.js";
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // khai bao noi cuoi cung file se di ve / cb = callback
    cb(null, "public/upload"); // luu tru trong public/upload
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // ten file khi luu tru len = Thoi gian hien tai + '-' + ten file
  },
});

var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    console.log(file);
    if (
      file.mimetype == "image/bmp" ||
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpeg" ||
      file.mimetype == "image/jpg"
    ) {
      cb(null, true);
    } else {
      return cb(new Error("Only image are allowed !"));
    }
  },
}).single("pruductImage"); // nhan anh o input nao`
async function addProduct(req, res) {
  upload(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      res.status(httpStatusCode.INTERNAL_SEVER_EROR).json({
        message: "Upload fail",
        error: "A multer error occurred when uploading.",
      });
    } else if (err) {
      res.status(httpStatusCode.INTERNAL_SEVER_EROR).json({
        message: "Upload fail",
        error: "An unknown error occurred when uploading.",
      });
    } else {
      console.log("Upload successfully");
      try {
        // function getSelectionOption() {
        //   var selectElement = document.getElementById("txtType");
        //   var selectOption = selectElement.value;
        //   return selectOption;
        // }
        // var res = getSelectionOption();
        await productRepositories.addProduct({
          name: req.body.txtName,
          price: req.body.txtPrice,
          type: req.body.txtType,
          image: req.file.filename,
        });
        res.status(httpStatusCode.INSERT_OK).redirect("/");
      } catch (exception) {
        res.status(httpStatusCode.INTERNAL_SEVER_EROR).json({
          error: exception.toString(),
        });
      }
    }
  });
}

// async function listProduct(req, res) {
//   try {
//     const getListProduct = await productRepositories.listProduct;
//     res.render("list", { list: getListProduct });
//   } catch (exception) {
//     res
//       .status(HttpStatusCode.INTERNAL_SEVER_EROR)
//       .json({ message: exception.toString() });
//   }
// }

export default {
  addProduct,

  /* listProduct*/
};
