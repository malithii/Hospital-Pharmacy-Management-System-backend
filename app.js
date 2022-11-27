import express from "express";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World1");
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
