import express from "express";
import mongoose from "mongoose";
import data from "./data.js";
import dotenv from "dotenv";
import userRouter from "./routers/userRouter.js";

const port = 5500;
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
app.get("/api/products/:id", (req, res) => {
  const product = data.products.find((x) => x._id === req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product Not Found" });
  }
});

app.get("/api/products", (req, res) => {
  res.send(data.products);
});
app.use("/api/users", userRouter);
app.get("/", (req, res) => {
  res.send("Server is ready");
});

app.use((err, req, res) => {
  res.status(500).send({ message: err.message });
});

app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});
