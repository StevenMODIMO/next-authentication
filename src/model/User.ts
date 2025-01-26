import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  email: String,
  password: String,
  image: String,
});

export default models.User || model("User", userSchema);
