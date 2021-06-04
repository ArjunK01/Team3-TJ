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

app.get("/student", async (req, res) => {
  const snapshot = await db
    .collection("Students")
    .doc(req.query.id)
    .get()
    .then(resp => res.send({ ...resp.data(), id: resp.id }))
    .catch(err => res.sendStatus(400));
});

app.get("/staff", async (req, res) => {
  const snapshot = await db.collection("Staff").get();

  const staff = [];

  snapshot.forEach(t => {
    staff.push({ ...t.data(), id: t.id });
  });
  res.send(staff);
});

app.get("/classes", async (req, res) => {
  const snapshot = await db.collection("Classes").get();

  const classes = [];

  snapshot.forEach(c => {
    classes.push({ ...c.data(), id: c.id });
  });
  res.send(classes);
});

app.delete("/classes", async (req, res) => {
  const { id } = req.body;

  try {
    await db
      .collection("Classes")
      .doc(id)
      .delete();
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(401);
  }
});

app.get("/classes/roster", async (req, res) => {
  const id = req.query.id;
  const snapshot = await db
    .collection("Classes")
    .doc(id)
    .collection("Roster")
    .get();

  const students = [];

  snapshot.forEach(s => {
    students.push({ ...s.data(), id: s.id });
  });
  res.send(students);
});

app.put("/classes/grades", async (req, res) => {
  let { id, grade, email } = req.body;
  let ref = db
    .collection("Classes")
    .doc(id)
    .collection("Roster")
    .doc(email);
  ref.update({
    grade: grade
  });
  res.sendStatus(200);
});

app.delete("/classes/removeStudent", async (req, res) => {
  let { id, email } = req.body;

  db.collection("Classes")
    .doc(id)
    .collection("Roster")
    .doc(email)
    .delete();

  res.sendStatus(200);
});

app.post("/classes/add", async (req, res) => {
  let { classId, className, teacherName, teacherEmail } = req.body;
  await db.collection("Classes").add({
    classID: classId,
    className,
    teacher: { name: teacherName, email: teacherEmail }
  });
  res.sendStatus(200);
});

app.post("/classes/addStudent", async (req, res) => {
  let { id, email, name, grade } = req.body;
  if (!grade || grade !== "😐" || grade !== "🙁" || grade !== "😀") 
    grade = "😀";
  let query = db.collection("Students").where("email", "==", email);

  console.log(id);

  const snapshot = await query.get();
  if (snapshot.empty) {
    console.log("This student is not enrolled in this school!");
    res.sendStatus(400);
    return;
  }
  await db
    .collection("Classes")
    .doc(id)
    .collection("Roster")
    .doc(email)
    .set({
      name,
      grade
    });

  console.log("Added", name);
  res.sendStatus(200);
});

app.put("/classes/editTeacher", async (req, res) => {
  let {id, email, fName, lName} = req.body;
  let query = db.collection("Staff").where("email", "==", email);
  const snapshot = await query.get();
  if (snapshot.empty) {
    console.log("This teacher does not work at this school!");
    res.status(404).send("Teacher not employed");
    return;
  }
  let staff;
  snapshot.forEach(t => {
    staff = t.data();
  })
  console.log(staff)
  if(!staff.isTeacher) {
    console.log("This staff member is not a teacher!");
    res.sendStatus(400);
    return
  }
  let ref = db
    .collection("Classes")
    .doc(id)
  ref.update({
    "teacher.name": fName + " " + lName,
    "teacher.email": email
  })
  res.sendStatus(200);
});

app.put("/classes/editClass", async (req, res) => {
  let {id, className, classID} = req.body;
  let ref = db
    .collection("Classes")
    .doc(id)
  ref.update({
    classID: classID,
    className: className
  })
  res.sendStatus(200);
});

app.get("/events", async (req, res) => {
  const snapshot = await db.collection("Events").get();

  const events = [];

  snapshot.forEach(e => {
    events.push({ ...e.data(), id: e.id });
  });
  res.send(events);
});

app.post("/students/add", async (req, res) => {
  const { birthday, email, fName, gender, gradYear, lName } = req.body;

  let query = db.collection("Students").where("email", "==", email);
  const snapshot = await query.get();
  if (snapshot.empty) {
    const resp = await db.collection("Students").add({
      birthday,
      email,
      firstName: fName,
      lastName: gender,
      gradYear,
      lastName: lName,
      gender
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

app.post("/events/add", async (req, res) => {
  const { date, description } = req.body;

  let query = db.collection("Events");
  const snapshot = await query.get();
  const resp = await db.collection("Events").add({
    date: date,
    description: description
  });
  console.log("Added " + description + " on " + date);
  res.sendStatus(200);
});

  app.delete("events/delete", async (req, res) => {
    const { id } = req.body;
    try {
      await db.collection("Events").doc(id).delete();
      res.sendStatus(200);
    } catch (error) {
      console.log(error);
    res.sendStatus(401);
    }
  });


app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}...`);
});
