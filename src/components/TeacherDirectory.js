import React, { useState, useEffect, useContext } from 'react';
import DirectoryHeader from './DirectoryHeader';

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
                        return <div className="row" key={teacher.id}>
                            <h2 className="h5">
                                Teacher {teacher.id} First Name
                        </h2>
                        </div>
                    })}
                </div>
            </DirectoryHeader>
        </div>
    )
}

export default TeacherDirectory
