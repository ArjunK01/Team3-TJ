import React, { useContext } from 'react';
import { ClassesContext } from '../context/ClassesProvider';
import personClasses from '../utils/personClasses';
import '../styles/classList.css';

const ClassList = ({ email, person }) => {
    const { classes } = useContext(ClassesContext);
    return (
        <div>
            <div className="container ml-4">
                {personClasses(email, classes, person).length > 0 ?
                    <div>
                        {personClasses(email, classes, person).map((clas) => {
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
