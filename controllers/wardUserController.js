import WardUser from "../models/WardUser.js";

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
  const { username, password, wardNo, wardContact, wardEmail } = req.body;

  try {
    const wardUser = await WardUser.create({
      username,
      password,
      wardNo,
      wardContact,
      wardEmail,
    });
    res.status(201).json({ status: "success", wardUser: wardUser });
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
