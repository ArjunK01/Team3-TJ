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

  snapshot.forEach(s => {
    students.push({ ...s.data(), id: s.id });
  });
  res.send(students);
});

app.get("/staff", async (req, res) => {
  const snapshot = await db.collection("Staff").get();

  const staff = [];

  snapshot.forEach(t => {
    staff.push({ ...t.data(), id: t.id });
  });
  res.send(staff);
});

app.post("/students/add", async (req, res) => {
  const { birthday, email, fName, gender, gradYear, lName } = req.body;

  let query = db.collection("Students").where("email", "==", email);
  const snapshot = await query.get();
  if (snapshot.empty) {
    const resp = await db.collection("Students").add({
      birthday,
      email,
      fName,
      gender,
      gradYear,
      lName
    });

    console.log("Added", fName + lName + " with ID: ", resp.id);
    res.sendStatus(200);
  } else {
    res.sendStatus(400);
    console.log("This student is already enrolled!");
  }
});

app.post("/staff/add", async (req, res) => {
  const { email, fName, lName, isAdmin, isTeacher, docId } = req.body;

  try {
    await db
      .collection("Staff")
      .doc(docId)
      .set({
        email,
        isTeacher,
        isAdmin,
        firstName: fName,
        lastName: lName
      });
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(401);
    console.log(error);
  }
});

app.get("/login", async (req, res) => {
  const id = req.query.id;
  try {
    await db
      .collection("Staff")
      .doc(id)
      .get()
      .then(data => res.send(data.data()));
  } catch (error) {
    res.sendStatus(401);
    console.log(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}...`);
});
