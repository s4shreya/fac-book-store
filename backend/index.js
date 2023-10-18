import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import { PORT, mongoDBURL } from "./config.js";
import bookRoutes from "./routes/bookRoutes.js";

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS Policy
// Option 1: Allow all origins with default of CORS (*)
// app.use(cors());

// Option 2: Allow custom origins
app.use(
  cors({
    origin: "http://localhost:5173",
    method: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

// Home page route
app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome");
});

// Middleware for using book route
app.use("/books", bookRoutes);

// connecting with database
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database");
    // listen to requests
    app.listen(PORT, () => {
      console.log(`server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
