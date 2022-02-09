import mongoose from "mongoose";
import Joi from "joi";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    min: 3,
    max: 255,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
});

const UserModel = mongoose.model("user", userSchema);

export default UserModel;
