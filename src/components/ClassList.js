import React, { useContext, useEffect, useState } from 'react';
import { ClassesContext } from '../context/ClassesProvider';
import { RostersContext } from '../context/RostersProvider';
import axios from "axios";
import personClasses from '../utils/personClasses';
import '../styles/classList.css';

const ClassList = ({ email, person }) => {
    const { classes } = useContext(ClassesContext);
    const { rosters, setRerender } = useContext(RostersContext);

    useEffect(() => {
        console.log("class list rosters", rosters);
        setRerender(r => !r);
    }, [rosters]);

    return (
        <div>
            <div className="container ml-4">
                {personClasses(email, classes, rosters, person).length > 0 ?
                    <div>
                        {personClasses(email, classes, rosters, person).map((clas) => {
                            return <div className="row" key={clas.classID}>
                                <div className="justify-content-between">
                                    {clas.className} <a href={`/class/${clas.classID}`} className="class-page-link">➦</a>
                                </div>
                            </div>
                        })}
                    </div> :
                    "No classes to display"
                }
            </div>
        </div>
    )
}

export default ClassList
