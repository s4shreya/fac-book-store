import express from "express";
import mongoose from "mongoose";

import { PORT, mongoDBURL } from "./config.js";
import bookRoutes from './routes/bookRoutes.js';

const app = express();

// Middleware for parsing request body
app.use(express.json());

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
