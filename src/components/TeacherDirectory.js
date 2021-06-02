import React, { useState, useEffect, useContext } from 'react';
import Directory from './Directory';

import { ClassesContext } from '../context/ClassesProvider';

const TeacherDirectory = () => {
    const [teachers, setTeachers] = useState([]);
    const { classes } = useContext(ClassesContext);
    const fields = [
        { "name": "Email", "val": "email" },
        { "name": "Birthday", "val": "birthday" }
    ];

    useEffect(() => {
        try {
            fetch(`http://localhost:8000/staff`)
                .then(
                    resp => { return resp.json() }
                )
                .then((obj) => {
                    if (obj.length === 0) {
                        setTeachers([]);
                    }
                    else {
                        console.log("classes", classes);
                        console.log("teachers", obj);
                        setTeachers(obj);
                    }
                })
        } catch (error) {
            console.log(error);
        }
    }, []);

    return (
        <div>
            <Directory
                headerName="Teacher"
                classListHeader="Classes Teaching"
                peopleList={teachers}
                fields={fields}
            />
        </div>
    )
}

export default TeacherDirectory
