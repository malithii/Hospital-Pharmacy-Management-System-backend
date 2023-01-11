import Inventory from "../models/Inventory.js";
import RecievedDrugs from "../models/RecievedDrugs.js";

//new recieved drugs
export const newRecievedDrugs = async (req, res, next) => {
  const { user, date, recievedDrugs } = req.body;

  try {
    const recievedDrug = await RecievedDrugs.create({
      user,
      date,
      recievedDrugs,
    });

    for (let i = 0; i < recievedDrugs.length; i++) {
      const drug = recievedDrugs[i].drug;
      const batchNo = recievedDrugs[i].batchNo;
      const expDate = recievedDrugs[i].expDate;
      const quantity = recievedDrugs[i].quantity;

      let inventory = await Inventory.findOne({ user: user });
      if (!inventory) {
        // Create a new inventory for that user
        inventory = await Inventory.create({
          user,
        });
      }

      const index = inventory.inventory.findIndex(
        (item) => item.drug.toString() === drug.toString()
      );

      if (index !== -1) {
        const batchIndex = inventory.inventory[index].batch.findIndex(
          (item) => item.batchNo === batchNo
        );
        if (batchIndex !== -1) {
          inventory.inventory[index].batch[batchIndex].quantity =
            inventory.inventory[index].batch[batchIndex].quantity + quantity;
        } else {
          inventory.inventory[index].batch.push({
            batchNo,
            expDate,
            quantity,
          });
        }
        inventory.inventory[index].quantityInStock =
          inventory.inventory[index].quantityInStock + quantity;
      } else {
        inventory.inventory.push({
          drug,
          batch: [
            {
              batchNo,
              expDate,
              quantity,
            },
          ],
          quantityInStock: quantity,
          reorderLevel: 0,
        });
      }

      await inventory.save();
    }

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

export const getAllRecievedDrugs = async (req, res, next) => {
  try {
    const recievedDrug = await RecievedDrugs.find({}).populate(
      "recievedDrugs.drug"
    );
    res.status(201).json({ status: "success", recievedDrug: recievedDrug });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "could not find recieved drugs" });
    next();
  }
};
