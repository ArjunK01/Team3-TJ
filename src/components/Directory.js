import React, { useContext, useEffect, useState } from 'react';
import axios from "axios";

import NavigateButton from './NavigateButton';
import ClassList from './ClassList';
import HeaderWrap from './HeaderWrap';
import Loading from './Loading';

import { RostersContext } from "../context/RostersProvider";
import { ClassesContext } from "../context/ClassesProvider";

import '../styles/directory.css';

const Directory = ({ headerName, classListHeader, peopleList, fields }) => {
    const { rosters, setRosters, rerender, setRerender } = useContext(RostersContext);
    const { classes } = useContext(ClassesContext);

    //Set rosters context
    useEffect(() => {
        console.log("delayed use effec", classes);
        if (classes) {
            if (classes.length > 0) {
                classes.forEach(async cl => {
                    let res = await axios.get(
                        "http://localhost:8000/classes/roster?id=" + cl.id
                    );
                    let classRoster = [];
                    res.data.forEach(stu => {
                        classRoster.push(stu);
                    });
                    rosters.push({ "id": cl.id, "roster": classRoster })
                });
                setRosters(rosters);
            }
        }
    }, [classes, rerender]);

    useEffect(() => {
        setTimeout(setRerender(r => !r), 2000);
        console.log("timeout useEffec")

    }, []);

    return (
        <div>
            <HeaderWrap headerName={`${headerName} Directory`}>
                <div className="row m-2">
                    {peopleList ? peopleList.map((person) => {
                        return <div className="w-100">
                            <div className="card m-2 p-4 justify-content-left">
                                <div className="container-fluid p-4 w-100" key={person.id}>
                                    <div className="row w-100 ml-2">
                                        <h2 className="h4 name">{person.firstName} {person.lastName}</h2>
                                    </div>
                                    <div className="info w-100 ml-4">
                                        {fields && fields.map((field) => {
                                            return <div className="row" key={field.name}>{field.name}: {person[field.val] ? person[field.val] : "N/A"}</div>
                                        })}
                                        {headerName === "Teacher" && <div className="row w-100 ml-4">
                                            <div className="container row">{classListHeader}:</div>
                                            <div className="container-fluid">
                                                <ClassList
                                                    email={person.email}
                                                    person={headerName === "Student" ? "student" : "teacher"}
                                                />
                                            </div>
                                        </div>}
                                    </div>
                                    {headerName === "Student" &&
                                        <div className="row justify-content-left mt-3 ml-2">
                                            <NavigateButton
                                                buttonName="Visit Student Profile"
                                                url={`/student/${person.id}`}
                                                color="dark"
                                            />
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    }) :
                        <div>
                            <Loading />
                        </div>
                    }
                </div>
            </HeaderWrap>
        </div>
    )
}

// <div className="row w-100 ml-4">
//     <div className="container row">{classListHeader}:</div>
//     <div className="container-fluid">
//         <ClassList
//             email={person.email}
//             person={headerName === "Student" ? "student" : "teacher"}
//         />
//     </div>
// </div>

export default Directory
