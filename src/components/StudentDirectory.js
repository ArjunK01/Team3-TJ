import React, { useState, useEffect, useContext } from 'react'
import Directory from './Directory';

import { ClassesContext } from '../context/ClassesProvider';

const StudentDirectory = () => {
    const [students, setStudents] = useState([]);
    const { classes } = useContext(ClassesContext);
    const fields = [
        { "name": "Gender", "val": "gender" },
        { "name": "Email", "val": "email" },
        { "name": "Birthday", "val": "birthday" },
        { "name": "Graduation Year", "val": "gradYear" }
    ];

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
            <Directory
                headerName="Student"
                classListHeader="Enrolled Classes"
                peopleList={students}
                fields={fields}
            />
        </div>
    )
}

export default StudentDirectory
