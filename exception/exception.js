export default class Exception extends Error {
  static WRONG_DB_USERNAME_PASSWORD = "Wrong database's username and password";
  static WRONG_CONNECTION_STRING = "Wrong sever name/connection string";
  static CANNOT_CONNECT_MONGODB = "Cannot connect to Mongoose";
  static USER_EXIST = "User already exists";
  static CANNOT_REGISTER_USER = " Cannot register user ";
  static LOGIN_SUCCESSFUL = "Login successful";
  static WRONG_USERNAME_AND_PASSWORD = "Wrong username or password";

  constructor(message, validatorErrors = {}) {
    super(message);
    console.log("Connect mongoose sucessfully");
    this.validatorErrors = validatorErrors;
  }
}
