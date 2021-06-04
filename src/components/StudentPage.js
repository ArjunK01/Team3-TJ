import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ClassesContext } from "../context/ClassesProvider";
import "../styles/studentpage.css";
import "../styles/directory.css";
import "../styles/classPage.css";
import { useHistory } from "react-router-dom";

import HeaderWrap from "./HeaderWrap";

const StudentPage = () => {
  let { id } = useParams();
  const history = useHistory();
  const [student, setStudent] = useState({});
  const [classes, setClasses] = useState([]);
  const [roster, setRoster] = useState([]);

  useEffect(async () => {
    await axios
      .get("http://localhost:8000/student?id=" + id)
      .then(res => setStudent({ ...res.data, classes: [] }));
    await axios
      .get("http://localhost:8000/classes")
      .then(res => setClasses(res.data));
  }, []);

  useEffect(() => {
    console.log("IN USE EFFECT");
    setRoster([]);
    console.log("Classes", classes);
    if (classes.length > 1) {
      classes.forEach(async cl => {
        console.log(cl.className);
        let res = await axios.get(
          "http://localhost:8000/classes/roster?id=" + cl.id
        );
        res.data.forEach(stu => {
          if (stu.id === student.email) {
            let temp = [];
            roster.forEach(x => temp.push(x));
            console.log(temp);
            temp.push({ className: cl.className, id: cl.id, grade: stu.grade });
            console.log(temp);
            setRoster(r => {
              let temp = [];
              r.forEach(x => temp.push(x));
              console.log(temp);
              temp.push({
                className: cl.className,
                id: cl.classID,
                grade: stu.grade
              });
              console.log(temp);
              return temp;
            });
          }
        });
      });
    }
  }, [classes]);

  return (
    // <HeaderWrap headerName={student.firstName + " " + student.lastName}>
    //   <div className="m-4">
    //     <div className="row w-100 ml-2 mb-2">
    //       <div>
    //         <i className="fas fa-envelope me-3 mr-2"></i>
    //         {student.email}
    //       </div>
    //     </div>
    //   </div>
    //   <div style={{ backgroundColor: "white" }}>
    //     <div>{student && student.email}</div>
    //     <div>{student && student.firstName}</div>
    //     <div>{student && student.lastName}</div>
    //     <div>{student && student.birthday}</div>
    //     <div>{student && student.gradYear}</div>
    //     <div>{student && student.gender}</div>
    //     <div>
    //       {roster.map(x => {
    //         return (
    //           <p key={Math.random()}>
    //             {x.className} - {x.grade} - {x.id}
    //           </p>
    //         );
    //       })}
    //     </div>
    //   </div>
    // </HeaderWrap>
    <HeaderWrap headerName={"Student Page"}>
      <div className="card p-4 m-4">
        <div className="m-4">
          <div className="row w-100 ml-2">
            <h2 className="h5 name">
              {student.firstName + " " + student.lastName}
            </h2>
          </div>
          <div className="row w-100 ml-2 mb-1">
            <div>
              <i className="fas fa-envelope me-3 mr-2"></i>
              {student.email}
            </div>
          </div>
          <div className="row w-100 ml-2 mb-1">
            <div>Gender: {student.gender}</div>
          </div>
          <div className="row w-100 ml-2 mb-1">
            <div>Birthday: {student.birthday}</div>
          </div>
          <div className="row w-100 ml-2 mb-2">
            <div>Graduation Year: {student.gradYear}</div>
          </div>
          <div className="row w-100 ml-2 mt-4 border-bottom mb-3">
            <h2 className="h5 name">Classes</h2>
          </div>
          <div className="ml-2 mb-3">
            {roster.map(x => {
              return (
                <p
                  key={Math.random()}
                  onClick={() => history.push(`/class/${x.id}`)}
                  className="linkToClass"
                >
                  {x.className}: {x.grade}
                </p>
              );
            })}
          </div>
        </div>
      </div>
    </HeaderWrap>
  );
};

export default StudentPage;
