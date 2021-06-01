const express = require("express");
const cors = require("cors");
const axios = require("axios");
const db = require("./firebase");

const PORT = 8000;

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("HELLO");
});

app.get("/students", async (req, res) => {
  const snapshot = await db.collection("Students").get();

  const students = [];

  snapshot.forEach((s) => {
    students.push({...s.data(), id: s.id});
  })
  res.send(students);
})

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}...`);
});
