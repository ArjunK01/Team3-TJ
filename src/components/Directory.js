import React from 'react';
import NavigateButton from './NavigateButton';
import ClassList from './ClassList';
import HeaderWrap from './HeaderWrap';
import '../styles/directory.css';

const Directory = ({ headerName, classListHeader, peopleList, fields }) => {
    return (
        <div>
            <HeaderWrap headerName={`${headerName} Directory`}>
                <div>
                    {peopleList && peopleList.map((person) => {
                        return <div className="container mx-4 my-5" key={person.id}>
                            <div className="row">
                                <h2 className="h5 name">{person.firstName} {person.lastName}</h2>
                            </div>
                            <div className="container info">
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
                                        color="dark"
                                    />
                                </div>
                            }
                        </div>
                    })}
                </div>
            </HeaderWrap>
        </div>
    )
}

export default Directory