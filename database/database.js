import mongoose from "mongoose";
import Exception from "../exception/exception.js";
mongoose.set("strictQuery", true);
async function connect() {
  try {
    let connection = await mongoose.connect(process.env.MONGO_URI);
    console.log("Connect mongoose sucessfully");
    return connection;
  } catch (error) {
    debugger;
    const { code } = error;
    if (error.code == 8000) {
      throw new Exception(Exception.WRONG_DB_USERNAME_PASSWORD);
    } else if (code == "ENOTFOUND") {
      throw new Exception(Exception.WRONG_CONNECTION_STRING);
    }
    throw new Exception(Exception.CANNOT_CONNECT_MONGODB);
  }
}

export default connect;
