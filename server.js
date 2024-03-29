const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const colors = require("colors");
const dotenv = require("dotenv");
const path = require('path');
const connectDB = require("./config/db");

//env config
dotenv.config();

//router import
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");

//mongodb connection
connectDB();

//rest objecct
const app = express();


//middelwares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//static file
app.use(express.static(path.join(__dirname, "./client/build")));

//routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/post", postRoutes);

// Port
const PORT = process.env.PORT || 8080;

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"))
});
//listen
app.listen(PORT, () => {
  console.log(
    `Server Running on ${process.env.DEV_MODE} mode port no ${PORT}`.bgCyan
      .white
  );
});
