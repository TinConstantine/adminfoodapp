import express from "express";
import * as dotenv from "dotenv";
import product from "./model/product.js";
import bodyParser from "body-parser";
import connect from "./database/database.js";
import { productRouter } from "./router/index.js";
import cors from "cors";
dotenv.config(); //must have
const app = express();
app.use(cors());
app.set("view engine", "ejs");
app.use(express.static("public")); // nguoi dung duoc xem
app.set("views", "./views");
app.use(express.json());
const port = process.env.PORT ?? 3005;
//cau hinh multer (storage va upload)

// hien thi form

app.get("/add", (req, res) => {
  res.render("add");
});
app.use(bodyParser.urlencoded({ extended: false })); //parse du lieu post len
app.use("/", productRouter);

async function getProduct(req, res) {
  const products = await product.find({});

  return products;
}

app.get("/", (req, res) => {
  getProduct(req, res).then((foundProduct) => {
    if (!foundProduct) {
      res.json({ Error: "Cannot get product" });
    } else {
      res.render("list", { list: foundProduct });
    }
  });
});

app.get("/json", (req, res) => {
  getProduct().then((foundProduct) => {
    if (!foundProduct) {
      res.json({ Error: "Cannot get product" });
    } else {
      const dogs = foundProduct.filter((e) => e.type == "Dog");
      res.json({ list: dogs });
    }
  });
});

// app.get("/edit/:id", async (req, res) => {
//   const editProduct = await product.findById(req.params.id);
//   idProduct = req.params.id;
//   if (!editProduct) {
//     res.send("Cannot get id");
//   } else {
//     res.render("edit", { product: editProduct });
//   }
//   console.log(idProduct);
// });

// app.post("/edit", async (req, res) => {
//   const editProduct = await product.findById(idProduct);
//   console.log(editProduct);
//   if (!editProduct) {
//     res.send("Cannot find id");
//   } else {
//     debugger;
//     editProduct.name = req.body.txtName ?? editProduct.name;
//     editProduct.type = req.body.txtType ?? editProduct.type;
//     editProduct.image = req.file.filename ?? editProduct.image;
//     editProduct.price = req.body.txtPrice ?? editProduct.price;
//     await editProduct.save();
//     debugger;
//     res.send("Edit success");
//   }
// });
app.listen(port, async () => {
  await connect();
  console.log("listening on port " + port);
});
