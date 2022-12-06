import WardUser from "../models/WardUser.js";
import jwt from "jsonwebtoken";

const MAX_AGE = 3 * 24 * 60 * 60;

const createToken = (id) => {
  return jwt.sign({ id }, "secret", {
    expiresIn: MAX_AGE,
  });
};

export const allWardUsers = async (req, res, next) => {
  try {
    const wardUser = await WardUser.find({}, { password: 0 });

    res.status(201).json({ status: "success", wardUser: wardUser });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Could not find ward users" });
    next();
  }
};

export const newWardUser = async (req, res, next) => {
  const { username, password, wardNo, contact, email, type } = req.body;

  try {
    const wardUser = await WardUser.create({
      username,
      password,
      wardNo,
      contact,
      email,
      type,
    });

    res.status(201).json({
      status: "success",
      wardUser: wardUser,
      token: createToken(wardUser._id),
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "WardUser not created" });
    next();
  }
};

export const updateWardUser = async (req, res, next) => {
  const { _id, username, password, wardNo, wardContact, wardEmail } = req.body;

  try {
    const wardUser = await WardUser.findByIdAndUpdate(
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
    res.status(201).json({ status: "success", wardUser: wardUser });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "WardUser not updated" });
    next();
  }
};

export const login = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const wardUser = await WardUser.login(username, password);
    const token = createToken(wardUser._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: MAX_AGE * 1000 });
    res.status(200).json({ wardUser: wardUser });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "cannot login" });
    next();
  }
};
