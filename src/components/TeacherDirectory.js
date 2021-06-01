import React, { useState, useEffect, useContext } from 'react';
import DirectoryHeader from './DirectoryHeader';
import ClassList from './ClassList';

import { ClassesContext } from '../context/ClassesProvider';

const TeacherDirectory = () => {
    const [teachers, setTeachers] = useState([]);
    const { classes } = useContext(ClassesContext);

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
            <DirectoryHeader headerName="Teacher Directory">
                <div>
                    {teachers && teachers.map((teacher) => {
                        return <div className="container mx-4 my-5" key={teacher.id}>
                            <div className="row">
                                <h2 className="h5">{teacher.firstName} {teacher.lastName}</h2>
                            </div>
                            <div className="container">
                                <div className="row">Email: {teacher.email ? teacher.email : "N/A"}</div>
                                <div className="row">Birthday: {teacher.birthday ? teacher.birthday : "N/A"}</div>
                                <div className="row justify-content-left">
                                    <div className="container row">Classes Teaching:</div>
                                    <div className="container">
                                        <ClassList email={teacher.email} person="teacher" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    })}
                </div>
            </DirectoryHeader>
        </div>
    )
}

export default TeacherDirectory
