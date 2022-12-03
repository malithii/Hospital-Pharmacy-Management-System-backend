import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import pharmacistRoutes from "./routes/pharmacistRoutes.js";
import wardUserRoutes from "./routes/wardUserRoutes.js";

dotenv.config();

const app = express();
app.use(cors());

app.use(express.json());

app.use("/pharmacist", pharmacistRoutes);
app.use("/ward-users", wardUserRoutes);

mongoose
  .connect(process.env.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) =>
    app.listen(3000, () => {
      console.log("Server started on port 3000");
    })
  )
  .catch((error) => {
    console.log(error);
  });
