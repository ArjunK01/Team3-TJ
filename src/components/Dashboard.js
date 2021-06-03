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

  const getRosterSize = id => { };

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
                      {user && user.lastName}!
                    </div>
                    <div className="email text-secondary">
                      <i className="fas fa-envelope me-3 mr-1"></i> {user && user.email}
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
                      <i class="fas fa-plus mr-2"></i> Add Class
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
                  isAdmin={user.isAdmin}
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
