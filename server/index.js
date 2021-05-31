const express = require("express");
const cors = require("cors");
const axios = require("axios");
const db = require("./firebase");
const { v4: uuidv4 } = require("uuid");

const PORT = 8000;

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("HELLO");
});

app.listen(PORT, () => {
  console.log("Listening");
});
