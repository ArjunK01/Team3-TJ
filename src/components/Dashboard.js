import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthProvider";
import { ClassesContext } from "../context/ClassesProvider";
import "../styles/dashboard.css";
import { Redirect } from "react-router-dom";
import ClassCard from "./ClassCard";
import Sidebar from "./Sidebar";
import DashboardForm from "./DashboardForm";
import HeaderWrap from "./HeaderWrap";

import axios from "axios";

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  const { classes, rerender, setRerender } = useContext(ClassesContext);

  const [classForm, setClassForm] = useState(false);
  const [studentForm, setStudentForm] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);

  const [cl, setCl] = useState([]);

  const getClasses = async () => {
    axios.get("http://localhost:8000/classes").then(res => {
      let temp = [];
      res.data.forEach(async c => {
        temp.push({
          classId: c.classID,
          className: c.className,
          teacher: c.teacher.name,
          id: c.id
        });
      });
      setCl(temp);
    });
  };

  const getRosterSize = id => {};

  const getTeachers = () => {
    try {
      fetch(`http://localhost:8000/staff`)
        .then(resp => {
          return resp.json();
        })
        .then(obj => {
          if (obj.length === 0) {
            setTeachers([]);
          } else {
            setTeachers(obj);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };
  const getStudents = () => {
    try {
      fetch(`http://localhost:8000/students`)
        .then(resp => {
          return resp.json();
        })
        .then(obj => {
          if (obj.length === 0) {
            setStudents([]);
          } else {
            console.log("classes", classes);
            console.log("students", obj);
            setStudents(obj);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getClasses();
    getTeachers();
    getStudents();
    console.log("EJHREERES");
  }, [classes, rerender]);

  if (!user) {
    return <Redirect to="/login" />;
  }

  return (
    <HeaderWrap headerName="Dashboard" dashboard={true}>
      <div className="card m-2 p-4">
        <div className="tbg">
          <div className="container-fluid px-4 py-4">
            <div className="dashboardContainer">
              <div className="leftContainer">
                <div className="userInfoContainer">
                  <div className="userInfo">
                    <div className="h4 font-weight-bold">
                      Welcome back, {user && user.firstName}{" "}
                      {user && user.lastName}
                    </div>
                    <div className="email text-secondary">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      {user && user.email}
                    </div>
                    <div className="status">
                      {user.isTeacher && (
                        <div className="isTeacher">Teacher</div>
                      )}
                      {user.isAdmin && <div className="isAdmin">Admin</div>}
                    </div>
                  </div>
                </div>
                <div className="container-fluid m-0 p-0">
                  <div className="classListHeaderContainer">
                    <div className="classListHeader">
                      Classes at TJ Elementary School
                    </div>
                    {user.isAdmin && (
                      <div
                        className="addClassBtn"
                        onClick={() => {
                          setClassForm(f => !f);
                          setStudentForm(false);
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                          />
                        </svg>
                        Add Class
                      </div>
                    )}
                  </div>
                  <hr></hr>
                  <div className="cList">
                    {cl.length > 0 &&
                      cl.map(c => {
                        return <ClassCard key={c.classId} c={c} user={user} />;
                      })}
                  </div>
                </div>
              </div>
              <div className="rightContainer">
                <Sidebar
                  setStudentForm={setStudentForm}
                  setClassForm={setClassForm}
                  classForm={classForm}
                  studentForm={studentForm}
                  numClasses={cl.length}
                  numTeachers={teachers.length}
                  numStudents={students.length}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </HeaderWrap>
  );
};

export default Dashboard;
