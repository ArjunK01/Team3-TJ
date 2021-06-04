import React, {useEffect, useState} from "react";
import {AuthProvider} from "./../context/AuthProvider"
import axios from "axios"
import HeaderWrap from './HeaderWrap';

import '../styles/directory.css';
import '../styles/base.css';
import '../styles/classPage.css'


export default function ClassPage(props) {
    const id = props.match.params.id
    const [c, setClass] = useState(null)
    const [roster, setRoster] = useState([]);
    const [add, setAdd] = useState();
    const [changeTeacher, setChangeTeacher] = useState();
    let docID;
    let display;
    let name = "This class does not exist!" 
    let teacherName, teacherEmail;

    const fetchClasses = () => {
        console.log("fetchClasses was called!");
        const url = new URL("http://localhost:8000/classes");

        fetch(url)
            .then((resp) => {
                return (resp.json());
            })
            .then((obj) => {
                for (let element of obj) {
                    if (element.classID === id) {
                        docID = element.id
                        teacherName = element.teacher.name;
                        teacherEmail = element.teacher.email;
                        setClass(element);
                        const url2 = new URL("http://localhost:8000/classes/roster");
                        url2.searchParams.append("id", element.id);
                        fetch(url2)
                            .then((res) => {
                                return (res.json());
                            })
                            .then((result) => {
                                setRoster(result);
                            })
                        setAdd(
                            <button onClick={generateForm} className="btn btn-dark">
                                <i className="fas fa-plus mr-2"></i>Add student
                            </button>)
                        setChangeTeacher(
                            <button onClick = {generateTeacherChange} className = "btn btn-dark">
                                <i className="fas fa-plus mr-2"></i>Edit Info
                            </button>)
                        break;
                    }
                    else
                        name = "This class does not exist!"
                } //ends for

        }) //ends then
    } //ends fetchClasses

    const rosterDisplay = () => {
        if(roster.length === 0)
            return;
        const nameList = <div className="info w-100">
            {roster.map((cl) => (
                <div className="container-fluid border-bottom" key={cl.id}>
                    <div className="container-fluid p-3">
                        <div className="row">
                            <div className="font-weight-bold name">{cl.name}</div>
                        </div>
                        <div className="row w-100 m-2">
                            Email: {cl.id}
                        </div>
                        <div className="container-fluid w-100 mb-4 mt-2 mx-2">
                            <div className="row mb-2">
                                Grade: {cl.grade}
                            </div>
                            <div className="row">
                                <div className="card px-3 py-1">
                                    <div className="card-title mb-2">Change grade</div>
                                    <div className="btn-group justify-content-between">
                                        <button className="grade-btn" name={cl.id} value={"😀"} onClick={changeGrade}>😀</button>
                                        <button className="grade-btn" name={cl.id} value={"😐"} onClick={changeGrade}>😐</button>
                                        <button className="grade-btn" name={cl.id} value={"🙁"} onClick={changeGrade}>🙁</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row w-100 mx-2 mt-3 mb-1">
                            <button name={cl.id} onClick={removeStudent} className="btn btn-dark">
                                <i className="fas fa-minus mr-2"></i>Remove Student
                            </button>
                        </div>
                    </div>
                </div>

            ))}
        </div>
        return (nameList);
    }

    const editTeacher = (e) => {
        e.preventDefault();
        console.log("Name: ", teacherName);
        const names = teacherName.split(" ");
        console.log(names);
        let fName = document.getElementById("tFName").value;
        let lName = document.getElementById("tLName").value;
        teacherName = fName + " " + lName;
        let tEmail = document.getElementById("tEmail").value;

        if(fName === "" && names[0])
            fName = names[0];
        if(lName === "" && names[names.length - 1])
            lName = names[names.length - 1]
        if(tEmail === "")
            tEmail = teacherEmail;
        
        axios
            .put("http://localhost:8000/classes/editTeacher", {id: docID, email: tEmail, fName: fName, lName: lName})
            .then(
                (response) => {
                    // fetchClasses();
                    window.location.reload();
                },
            )
            .catch(error => {
                if(error.response.status === 404)
                    alert("There is no teacher with this email at this school!")
                else
                    alert("This staff member is not a teacher!")
            })
    }

    const generateTeacherChange = (e) => {
        setChangeTeacher(<form onSubmit = {editTeacher}>
            <input id = "tFName" type = "text" placeholder = "Enter updated first name here" />
            <input id = "tLName" type = "text" placeholder = "Enter updated last name here"/>
            <input id = "tEmail" type = "text" placeholder = "Enter updated teacher email here"/>
            <input type = "submit"/>
        </form>)
    }

    const removeStudent = (e) => {
        const email = e.target.name
        axios
            .delete("http://localhost:8000/classes/removeStudent", {data: {id: c.id, email: email}})
        fetchClasses();
    }

    const changeGrade = (e) => {
        const grade = e.target.value;
        const email = e.target.name;
        axios
            .put("http://localhost:8000/classes/grades", {id: c.id, grade: grade, email: email})
        fetchClasses();
    }

    const addStudent = (e) => {
        const sName = document.getElementById("name").value;
        const sEmail = document.getElementById("email").value;
        const sGrade = document.getElementById("grade").value;
        if(sEmail === "")
            alert("An email must be added!");
        else {
            axios
                .post("http://localhost:8000/classes/addStudent", {id: docID, email: sEmail, name: sName, grade: sGrade})
                .catch(function(error) {
                    if(error.response)
                        alert("This student is not enrolled in the school!");
                })
            // fetchClasses();
        }
    }

    const generateForm = (e) => {
        setAdd(<form onSubmit = {addStudent}>
            <input id = "name" type = "text" placeholder = "Enter student name here"/>
            <input id = "email" type = "text" placeholder = "Enter student email here"/>
            <input id = "grade" type = "text" placeholder = "Enter student grade here"/>
            <input type = "submit"/>
        </form>)
    }

    useEffect(() => {
        fetchClasses();
    }, [display])

    if (c === null) {
        console.log("here");
        display = <h3 className="d-flex justify-content-center">This class does not exist!</h3>
    }
    else {
        name = c.className;
        teacherName = c.teacher.name;
        teacherEmail = c.teacher.email
        display =
            <HeaderWrap headerName={name}>
                <div className="card p-4 m-4">
                    <div className="m-4">
                        <div className="row w-100 ml-2">
                            <h2 className="h5 name">Taught By: {teacherName}</h2>
                        </div>
                        <div className="row w-100 ml-2 mb-2">
                            <div>
                                <i className="fas fa-envelope me-3 mr-2"></i>{teacherEmail}
                            </div>
                            {changeTeacher}
                        </div>
                        <div className="row w-100 ml-2 mt-4 border-bottom">
                            <h2 className="h5 name">Roster</h2>
                        </div>
                        {rosterDisplay()}
                        <div className="d-flex justify-content-end mt-4">
                            {add}
                        </div>
                    </div>
                </div>
            </HeaderWrap>
    }

    return (
        display
    )
}