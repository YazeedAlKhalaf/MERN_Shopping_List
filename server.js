const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const db = require("./config/keys").mongoURI;
const path = require("path");

const ItemsRoute = require("./routes/api/items.route");
const AuthRoute = require("./routes/api/auth.route");

const app = express();

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// connect to DB
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Successfully connected to DB...");
  })
  .catch((error) => {
    console.log("error: ", error);
  });
// Use routes
app.use("/api/v1/items", ItemsRoute);
app.use("/api/v1/auth", AuthRoute);

// Serve static assets if we are in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Server up and running at port:", port);
});
