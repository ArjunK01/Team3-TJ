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

app.get("/teachers", async (req, res) => {
  const snapshot = await db.collection("Teachers").get();

  const teachers = [];

  snapshot.forEach((t) => {
    teachers.push({...t.data(), id: t.id});
  })
  res.send(teachers);
})

app.get("/admins", async (req, res) => {
  const snapshot = await db.collection("Admins").get();

  const admins = [];

  snapshot.forEach((a) => {
    admins.push({...a.data(), id: a.id});
  })
  res.send(admins);
})

app.post("/students/add", async (req, res) => {
  const {birthday, email, fName, gender, gradYear, lName} = req.body;

  let query = db.collection("Students").where("email", "==", email);
  const snapshot = await query.get();
  if(snapshot.empty)
  {
      const resp = await db.collection("Students").add({
          birthday,
          email,
          fName,
          gender,
          gradYear,
          lName,
      });

      console.log("Added", fName + lName + " with ID: ", resp.id);
      res.sendStatus(200);
  }
  else
  {
      res.sendStatus(400);
      console.log("This student is already enrolled!");
  }

});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}...`);
});
