import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// import { PORT, mongoDBURL } from "./config.js";
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
    origin: "*",
    // origin: [
    //   "http://localhost:5173",
    //   "https://fac-book-store-frontend.vercel.app",
    // ],
    method: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Load environment variables from .env file
dotenv.config();

const port = process.env.PORT;
const mongoDB_URL = process.env.mongoDB_URL;

// Home page route
app.get("/", (request, response) => {
  return response.status(234).send("Welcome");
});

// Middleware for using book route
app.use("/books", bookRoutes);

// connecting with database
mongoose
  .connect(mongoDB_URL)
  .then(() => {
    console.log("App connected to database");
    // listen to requests
    app.listen(port, () => {
      console.log(`server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

  export default app;