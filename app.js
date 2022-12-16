import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import drugsRoutes from "./routes/drugsRoutes.js";
import wardDrugUsageRoutes from "./routes/wardDrugUsageRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import recievedDrugsRoutes from "./routes/recievedDrugsRoutes.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
app.use(cors());

app.use(express.json());
app.use(cookieParser());

app.use("/users", userRoutes);
app.use("/drugs", drugsRoutes);
app.use("/drug-usage", wardDrugUsageRoutes);
app.use("/orders", orderRoutes);
app.use("/recieved-drugs", recievedDrugsRoutes);

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
