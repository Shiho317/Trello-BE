const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoute = require("./routes/Users");
const listRoute = require("./routes/Lists");

dotenv.config();

app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("mongoDB connected."))
  .catch((err) => console.log(err));

app.use(function (req, res, next) {
  //Enabling CORS
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/api/user", userRoute);
app.use("/api/list", listRoute);

app.use(cors());

const PORT = process.env.PORT || 8888;

app.listen(PORT, () => console.log(`server is listening at ${PORT}`));
