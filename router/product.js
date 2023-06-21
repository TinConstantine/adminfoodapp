import express from "express";
import product from "../model/product.js";
import multer from "multer";

import { productController } from "../controller/index.js";
import httpStatusCode from "../exception/HttpStatusCode.js";
const router = express.Router();
router.post("/add", productController.addProduct);
// router.get("/list", productController.listProduct);
let idProduct;
router.get("/edit/:id", async (req, res) => {
  const editProduct = await product.findById(req.params.id);
  idProduct = req.params.id;
  if (!editProduct) {
    res.send("Cannot get id");
  } else {
    res.render("edit", { product: editProduct });
  }
  console.log(idProduct);
});
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
router.post("/edit", async (req, res) => {
  upload(req, res, async (err) => {
    const myProduct = await product.findById(idProduct);
    if (!req.file) {
      console.log(req.body);
      console.log(req.file);
      myProduct.name = req.body.txtName ?? myProduct.name;
      myProduct.price = req.body.txtPrice ?? myProduct.price;
      await myProduct.save();
      res.status(httpStatusCode.INSERT_OK).redirect("/");
    } else {
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
          if (!myProduct) {
            throw new Exception({
              message: "Can not find product with id " + idProduct,
            });
          }
          console.log(req.body);
          console.log(req.file);
          myProduct.name = req.body.txtName ?? myProduct.name;
          myProduct.type = req.body.txtType ?? myProduct.type;
          myProduct.image = req.file.filename;
          myProduct.price = req.body.txtPrice ?? myProduct.price;
          await myProduct.save();
          res.status(httpStatusCode.INSERT_OK).redirect("/");
        } catch (exception) {
          res.status(httpStatusCode.INTERNAL_SEVER_EROR).json({
            error: exception.toString(),
          });
        }
      }
    }
  });
});

router.get("/delete/:id", async (req, res) => {
  debugger;
  await product.deleteOne({ _id: req.params.id });
  debugger;
  console.log(req.params.id);
  res.redirect("../");
  console.log();
});
export default router;
