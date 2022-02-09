import mongoose from "mongoose";
import Joi from "joi";

const Schema = mongoose.Schema;

const tokenSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
});

const TokenModel = mongoose.model("token", tokenSchema);

export default TokenModel;
