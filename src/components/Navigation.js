import React, { useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import Auth from "./Auth";
import Dashboard from "./Dashboard";
import firebase from "../firebase";
import { AuthContext } from "../context/AuthProvider";
import ClassPage from "./ClassPage";

import StudentDirectory from "./StudentDirectory";
import TeacherDirectory from "./TeacherDirectory";
import Calendar from "./Calendar";

import { ClassesContext } from "../context/ClassesProvider";

import "../styles/navigation.css";
import Landing from "./Landing";

const Navigation = () => {
  let { user } = useContext(AuthContext);
  const { setClasses } = useContext(ClassesContext);

  useEffect(() => {
    try {
      fetch(`http://localhost:8000/classes`)
        .then(resp => {
          return resp.json();
        })
        .then(obj => {
          if (obj.length === 0) {
            setClasses([]);
          } else {
            console.log(obj);
            setClasses(obj);
          }
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div>
      <Router>
        {/* NAVBAR */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <Link className="navbar-brand" to="/">
            TJ ELEMENTARY
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            {user ? (
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard">
                    Class Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/teacherdirectory">
                    Teacher Directory
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/studentdirectory">
                    Student Directory
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/calendar">
                    Calendar
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/login"
                    onClick={() => firebase.auth().signOut()}
                  >
                    Sign Out
                  </Link>
                </li>
              </ul>
            ) : (
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/studentdirectory">
                    Student Directory
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Log In
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </nav>
        {/* ROUTING */}
        <Switch>
          <Route
            path="/teacherdirectory"
            exact
            component={TeacherDirectory}
          ></Route>
          <Route
            path="/studentdirectory"
            exact
            component={StudentDirectory}
          ></Route>
          <Route path="/calendar" exact component={Calendar}></Route>

          <Route path="/class/:id" component={ClassPage}>
            {
              //Change to component, class page
            }
          </Route>
          <Route path="/student/:id">
            {
              //Change to component, student page
            }
          </Route>
          <Route path="/dashboard" exact component={Dashboard}></Route>
          <Route path="/login">
            {user ? <Redirect to="/dashboard" /> : <Auth />}
          </Route>
          <Route path="/">
            {user ? <Redirect to="/dashboard" /> : <Landing />}
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default Navigation;
