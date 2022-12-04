import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import pharmacistRoutes from "./routes/pharmacistRoutes.js";
import wardUserRoutes from "./routes/wardUserRoutes.js";
import drugsRoutes from "./routes/drugsRoutes.js";
import wardDrugUsageRoutes from "./routes/wardDrugUsageRoutes.js";

dotenv.config();

const app = express();
app.use(cors());

app.use(express.json());

app.use("/pharmacist", pharmacistRoutes);
app.use("/ward-users", wardUserRoutes);
app.use("/drugs", drugsRoutes);
app.use("/drug-usage", wardDrugUsageRoutes);

mongoose
  .connect(process.env.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) =>
    app.listen(9000, () => {
      console.log("Server started on port 9000");
    })
  )
  .catch((error) => {
    console.log(error);
  });
