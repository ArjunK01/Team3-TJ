import React, { useState, useEffect, useContext } from "react";
import "../styles/dashboard.css";
import axios from "axios";
import { ClassesContext } from "../context/ClassesProvider";

const DashboardForm = ({ f, setStudentForm, setClassForm }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [email, setEmail] = useState("");
  const [grad, setGrad] = useState(2021);
  const [gender, setGender] = useState("");
  const [classId, setClassId] = useState("");
  const [className, setClassName] = useState("");
  const [teacherName, setTeacherName] = useState("");
  const [teacherEmail, setTeacherEmail] = useState("");

  const { setRerender } = useContext(ClassesContext);
  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setBirthday("");
    setEmail("");
    setGrad(2021);
    setGender("");
    setClassId("");
    setClassName("");
    setTeacherEmail("");
    setTeacherName("");
  };
  const addStudent = () => {
    //const { birthday, email, fName, gender, gradYear, lName } = req.body;
    if (!email || !firstName || !lastName || !birthday || !grad || !gender)
      return;
    let b = birthday.split("-");
    b.push(b.shift());
    b = b.join("/");
    axios({
      method: "post",
      url: "http://localhost:8000/students/add",
      headers: {},
      data: {
        email,
        fName: firstName,
        lName: lastName,
        birthday: b,
        gender,
        gradYear: grad
      }
    }).then(res => {
      setRerender(r => !r);
      resetForm();
      setStudentForm(false);
    });
  };
  const addClass = () => {
    //const { birthday, email, fName, gender, gradYear, lName } = req.body;
    if (!teacherName || !teacherEmail || !classId || !className) return;
    let b = birthday.split("-");
    b.push(b.shift());
    b = b.join("/");
    axios({
      method: "post",
      url: "http://localhost:8000/classes/add",
      headers: {},
      data: {
        teacherEmail,
        teacherName,
        classId,
        className
      }
    }).then(res => {
      setRerender(r => !r);
      resetForm();
      setClassForm(false);
    });
  };

  return (
    <div className="dashboardForm">
      {f === "student" ? (
        <div>
          <input
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            type="text"
            class="form-control mb-3"
          />
          <input
            placeholder="First"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            type="text"
            class="form-control mb-3"
          />
          <input
            placeholder="Last"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            type="text"
            class="form-control mb-3"
          />
          <input
            placeholder="Last"
            value={birthday}
            onChange={e => setBirthday(e.target.value)}
            type="date"
            class="form-control mb-3"
          />
          <input
            placeholder="Graduation Year"
            value={grad}
            onChange={e => setGrad(e.target.value)}
            type="number"
            class="form-control mb-3"
          />
          <div className="genderPick">
            <div
              className="gender"
              onClick={() => setGender("M")}
              style={{
                backgroundColor: gender === "M" ? "#EAECEF" : null,
                color: gender === "M" ? "#495057" : "#6D757D",
                border: gender === "M" ? null : "1px solid #ced4da"
              }}
            >
              M
            </div>
            <div
              className="gender"
              onClick={() => setGender("F")}
              style={{
                backgroundColor: gender === "F" ? "#EAECEF" : null,
                color: gender === "F" ? "#495057" : "#6D757D",
                border: gender === "F" ? null : "1px solid #ced4da"
              }}
            >
              F
            </div>
          </div>
          <div className="submitCont">
            <div className="dashSubmitBtn" onClick={() => addStudent()}>
              Add Student
            </div>
          </div>
        </div>
      ) : (
        <div>
          <input
            placeholder="Class ID"
            value={classId}
            onChange={e => setClassId(e.target.value)}
            type="text"
            class="form-control mb-3"
          />
          <input
            placeholder="Class Name"
            value={className}
            onChange={e => setClassName(e.target.value)}
            type="text"
            class="form-control mb-3"
          />
          <input
            placeholder="Teacher Name"
            value={teacherName}
            onChange={e => setTeacherName(e.target.value)}
            type="text"
            class="form-control mb-3"
          />
          <input
            placeholder="Teacher Email"
            value={teacherEmail}
            onChange={e => setTeacherEmail(e.target.value)}
            type="text"
            class="form-control mb-3"
          />
          <div className="submitCont">
            <div className="dashSubmitBtn" onClick={() => addClass()}>
              Add Class
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardForm;
