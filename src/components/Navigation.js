import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";


import Home from './Home';
import StudentDirectory from './StudentDirectory';
import TeacherDirectory from './TeacherDirectory';

import { ClassesContext } from '../context/ClassesProvider';


const Navigation = () => {
    const { setClasses } = useContext(ClassesContext);

    useEffect(() => {
        try {
            fetch(`http://localhost:8000/classes`)
                .then(
                    resp => { return resp.json() }
                )
                .then((obj) => {
                    if (obj.length === 0) {
                        setClasses([]);
                    }
                    else {
                        console.log(obj);
                        setClasses(obj);
                    }
                })
        } catch (error) {
            console.log(error);
        }
    }, []);

    return (
        <div>
            <Router>
                {/* NAVBAR */}
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <Link className="navbar-brand" to="/">
                        TJ Elementary School
                    </Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to="/dashboard">Class Dashboard</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/teacherdirectory">Teacher Directory</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/studentdirectory">Student Directory</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/calendar">Calendar</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
                {/* ROUTING */}
                <Switch>
                    <Route path="/teacherdirectory" exact component={TeacherDirectory}>
                    </Route>
                    <Route path="/studentdirectory" exact component={StudentDirectory}>
                        {
                            //Change to component
                        }
                    </Route>
                    <Route path="/calendar">
                        {
                            //Change to component
                        }
                    </Route>
                    <Route path="/class/:id">
                        {
                            //Change to component, class page
                        }
                    </Route>
                    <Route path="/student/:id">
                        {
                            //Change to component, student page
                        }
                    </Route>
                    <Route path="/dashboard">
                        {
                            //Change to component
                        }
                    </Route>
                    <Route path="/" exact component={Home}></Route>
                </Switch>
            </Router>
        </div>
    )
}

export default Navigation
