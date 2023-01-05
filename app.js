import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import drugsRoutes from "./routes/drugsRoutes.js";
import wardDrugUsageRoutes from "./routes/wardDrugUsageRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import recievedDrugsRoutes from "./routes/recievedDrugsRoutes.js";
import inventoryRoutes from "./routes/inventoryRoutes.js";
import cookieParser from "cookie-parser";
import categoryRoutes from "./routes/categoryRoutes.js";
import storeTempRoutes from "./routes/storeTempRoutes.js";

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
app.use("/inventory", inventoryRoutes);
app.use("/category", categoryRoutes);
app.use("/store-temp", storeTempRoutes);

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
