import express from "express";
import mongoose from "mongoose";

import userRouter from "./routers/userRouter.js";
import productRouter from "./routers/productRouter.js";

const port = 5000;
// const dbUrl = `process.env.MONGODB_URL`;

const app = express();

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/amazona", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
  } catch (err) {
    console.log(err);
  }
};

connectDB();

app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.get("/", (req, res) => {
  res.send("Server is ready");
});

app.use((err, req, res) => {
  res.status(500).send({ message: err.message });
});

app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});
