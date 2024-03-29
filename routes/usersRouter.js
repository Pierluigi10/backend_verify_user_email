import sendEmail from "../utils/email.js";
import TokenModel from "../models/tokenModel.js";
import UserModel from "../models/usersModel.js";
import validate from "../models/validate.js"
// const crypto = import("crypto");
import crypto from "crypto";
import express from "express";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await UserModel.findOne({ email: req.body.email });
    if (user)
      return res.status(400).send("User with given email already exist!");

    user = await new UserModel({
      username: req.body.username,
      email: req.body.email,
    }).save();

    let token = await new TokenModel({
      userId: user._id,
      token: crypto.randomBytes(32).toString("hex"),
    }).save();

    const message = `${process.env.BASE_URL}/user/verify/${user.id}/${token.token}`;
    await sendEmail(user.email, "Verify Email", message);

    res.send("An Email sent to your account please verify");
  } catch (error) {
    res.status(400).send("An error occured");
  }
});

router.get("/verify/:id/:token", async (req, res) => {
  try {
    const user = await UserModel.findOne({ _id: req.params.id });
    if (!user) return res.status(400).send("Invalid link");

    const token = await TokenModel.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token) return res.status(400).send("Invalid link");

    await UserModel.updateOne({ _id: user._id, verified: true });
    await TokenModel.findByIdAndRemove(token._id);

    res.send("email verified sucessfully");
  } catch (error) {
    res.status(400).send("An error occured");
  }
});

export { router };
