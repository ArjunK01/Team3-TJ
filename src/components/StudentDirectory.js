import React, { useState, useEffect } from 'react'
import DirectoryHeader from './DirectoryHeader';

const StudentDirectory = () => {
    const [students, setStudents] = useState([]);

    useEffect(async () => {
        try {
            await fetch(`http://localhost:8000/students`)
                .then(
                    resp => { return resp.json() }
                )
                .then((obj) => {
                    if (obj.length === 0) {
                        setStudents([]);
                    }
                    else {
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
                    {students.map((student) => {
                        return <div className="row" key={student.id}>
                            <h2 className="h5">
                                Student {student.id} First Name
                            </h2>
                        </div>
                    })}
                </div>
            </DirectoryHeader>
        </div>
    )
}

export default StudentDirectory
