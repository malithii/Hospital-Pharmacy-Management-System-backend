import User from "../models/User.js";
import jwt from "jsonwebtoken";

const MAX_AGE = 3 * 24 * 60 * 60;

const createToken = (id) => {
  return jwt.sign({ id }, "secret", {
    expiresIn: MAX_AGE,
  });
};

export const allUsers = async (req, res, next) => {
  try {
    const user = await User.find({}, { password: 0 });

    res.status(201).json({ status: "success", user: user });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Could not find users" });
    next();
  }
};

export const newUser = async (req, res, next) => {
  const { username, password, wardNo, contact, email, type } = req.body;

  try {
    const user = await User.create({
      username,
      password,
      wardNo,
      contact,
      email,
      type,
    });

    res.status(201).json({
      status: "success",
      user: user,
      token: createToken(user._id),
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "user not created" });
    next();
  }
};

export const updateUser = async (req, res, next) => {
  const { _id, username, password, wardNo, wardContact, wardEmail } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      {
        _id: _id,
      },
      {
        username: username,
        password: password,
        wardNo: wardNo,
        wardContact: wardContact,
        wardEmail: wardEmail,
      }
    );
    res.status(201).json({ status: "success", user: user });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "user not updated" });
    next();
  }
};

export const login = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const user = await User.login(username, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: MAX_AGE * 1000 });
    res.status(200).json({ status: "success", user: user });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "cannot login" });
    next();
  }
};
