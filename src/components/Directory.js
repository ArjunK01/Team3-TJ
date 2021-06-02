import React from 'react';
import NavigateButton from './NavigateButton';
import ClassList from './ClassList';

const Directory = ({ headerName, classListHeader, peopleList, fields }) => {
    return (
        <div>
            <div className="row justify-content-center m-4">
                <h1 className="display-3">
                    {headerName} Directory
                </h1>
            </div>
            <div className="row m-4">
                <div className="card w-100 py-2 px-4">
                    <div>
                        {peopleList && peopleList.map((person) => {
                            return <div className="container mx-4 my-5" key={person.id}>
                                <div className="row">
                                    <h2 className="h5">{person.firstName} {person.lastName}</h2>
                                </div>
                                <div className="container">
                                    {fields && fields.map((field) => {
                                        return <div className="row">{field.name}: {person[field.val] ? person[field.val] : "N/A"}</div>
                                    })}
                                    <div className="row">
                                        <div className="container row">{classListHeader}:</div>
                                        <div className="container">
                                            <ClassList
                                                email={person.email}
                                                person={headerName === "Student" ? "student" : "teacher"}
                                            />
                                        </div>
                                    </div>
                                </div>
                                {headerName === "Student" &&
                                    <div className="row justify-content-left mt-3">
                                        <NavigateButton
                                            buttonName="Visit Student Profile"
                                            url={`/student/${person.id}`}
                                        />
                                    </div>
                                }
                            </div>
                        })}
                    </div>
                </div>
            </div>
            <div className="row justify-content-center m-4">
                <NavigateButton buttonName="Back To Home" url="/" />
            </div>
        </div>
    )
}

export default Directory
