import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import "dotenv/config";

import { errorHandler } from "./middleware/errorMiddleware.js";
import { connectDB } from "./config/db.js";
import { router as userRoute } from "./routes/usersRoutes.js";
import { router as blogRoute } from "./routes/blogsRoutes.js"

connectDB();

const app = express();
const port = process.env.PORT || 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/users", userRoute);
app.use("/blogs", blogRoute);

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server Running on port ${port}`);
});