import Pharmacist from "../models/Pharmacist.js";

export const newPharmacist = async (req, res, next) => {
  const { username, password, email, phoneNo } = req.body;

  try {
    const pharmacist = await Pharmacist.create({
      username,
      password,
      email,
      phoneNo,
    });
    res.status(201).json({ status: "success", pharmacist: pharmacist });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Pharmacist not created" });
    next();
  }
};

export const updatePharmacist = async (req, res, next) => {
  const { _id, username, password, email, phoneNo } = req.body;

  try {
    const pharmacist = await Pharmacist.findByIdAndUpdate(
      {
        _id: _id,
      },
      {
        username: username,
        password: password,
        email: email,
        phoneNo: phoneNo,
      }
    );
    res.status(201).json({ status: "success", pharmacist: pharmacist });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Pharmacist not updated" });
    next();
  }
};
