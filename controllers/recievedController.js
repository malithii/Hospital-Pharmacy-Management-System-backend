import RecievedDrugs from "../models/RecievedDrugs.js";

//new recieved drugs
export const newRecievedDrugs = async (req, res, next) => {
  const { date, recievedDrugs } = req.body;

  try {
    const recievedDrug = await RecievedDrugs.create({
      date,
      recievedDrugs,
    });

    const drug = await RecievedDrugs.findById(recievedDrug._id).populate(
      "recievedDrugs.drug"
    );

    res.status(201).json({ status: "success", recievedDrug: drug });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "recieved drug data not created" });
    next();
  }
};
