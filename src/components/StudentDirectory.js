import React, { useState, useEffect, useContext } from 'react'
import DirectoryHeader from './DirectoryHeader';
import ClassList from './ClassList';

import { ClassesContext } from '../context/ClassesProvider';

const StudentDirectory = () => {
    const [students, setStudents] = useState([]);
    const { classes } = useContext(ClassesContext);

    useEffect(() => {
        try {
            fetch(`http://localhost:8000/students`)
                .then(
                    resp => { return resp.json() }
                )
                .then((obj) => {
                    if (obj.length === 0) {
                        setStudents([]);
                    }
                    else {
                        console.log("classes", classes);
                        console.log("students", obj);
                        setStudents(obj);
                    }
                })
        } catch (error) {
            console.log(error);
        }
    }, []);

    return (
        <div>
            <DirectoryHeader headerName="Student Directory">
                <div>
                    {students && students.map((student) => {
                        return <div className="container m-4" key={student.id}>
                            <div className="row">
                                <h2 className="h5">{student.firstName} {student.lastName}</h2>
                            </div>
                            <div className="container">
                                <div className="row">Gender: {student.gender ? student.gender : "N/A"}</div>
                                <div className="row">Email: {student.email ? student.email : "N/A"}</div>
                                <div className="row">Birthday: {student.birthday ? student.birthday : "N/A"}</div>
                                <div className="row">Graduation Year: {student.gradYear ? student.gradYear : "N/A"}</div>
                                <div className="row">
                                    Enrolled Classes:
                                    <ClassList email={student.email} person="student" />
                                </div>
                                <div className="row"><a href={`/student/${student.id}`}>Visit Student Profile</a></div>
                            </div>
                        </div>
                    })}
                </div>
            </DirectoryHeader>
        </div>
    )
}

export default StudentDirectory