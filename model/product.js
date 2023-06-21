import { ObjectId } from "mongoose";
import mongoose, { Schema } from "mongoose";
export default mongoose.model(
  "Product",
  new Schema({
    id: { type: ObjectId },
    name: { type: String, required: true },
    price: { type: String, required: true },
    image: { type: String, required: true },
    type: { type: String, required: true },
  })
);
