import React, {useEffect, useState} from "react";
import {AuthProvider} from "./../context/AuthProvider"
import axios from "axios"
import HeaderWrap from './HeaderWrap';

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
                        setAdd(<button onClick = {generateForm}>Add a student!</button>)
                        setChangeTeacher(<button onClick = {generateTeacherChange}>Edit Info!</button>)
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
        const nameList = <ul>
            {roster.map((cl) => (
                    <li style = {{marginLeft: "5%"}} key = {cl.id}>
                        {cl.name} 
                        <button name = {cl.id} onClick = {removeStudent} style = {{margin: "0.5% 3%", marginBottom: "0.3%", padding: "0% 1%"}}>Remove Student</button>
                        <ul style = {{listStyleType: "square", marginLeft: "2%"}}>
                            <li>Email: {cl.id}</li>
                            <li>
                                Grade: {cl.grade}
                                <button name = {cl.id} value = {"😀"} onClick = {changeGrade} style = {{marginLeft: "2%"}}>😀</button>
                                <button name = {cl.id} value = {"😐"} onClick = {changeGrade} style = {{margin: "0% 1%", marginBottom: "1.5%"}}>😐</button>
                                <button name = {cl.id} value = {"🙁"} onClick = {changeGrade}>🙁</button>
                            </li>
                        </ul>
                    </li>
            ))}
        </ul>
        return(nameList);
    } //ends rosterDisplay

    const editTeacher = (e) => {
        const names = teacherName.split(" ");
        let fName = document.getElementById("tFName").value;
        let lName = document.getElementById("tLName").value;
        let tEmail = document.getElementById("tEmail").value;

        if(fName === "" && names[0])
            fName = names[0];
        if(lName === "" && names[name.length - 1])
            lName = names[name.length - 1]
        if(tEmail === "")
            tEmail = teacherEmail;
        axios
            .put("http://localhost:8000/classes/editTeacher", {id: docID, email: tEmail, fName: fName, lName: lName})
            .catch(function(error) {
                e.preventDefault();
                alert("error");
                if(error.response) {
                    console.log(error.response);
                    alert("This student is not enrolled in the school!");
                }
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
        let mounted = true;
        if(mounted)
            fetchClasses();
        return () => mounted = false;
    }, [display])

    if(c === null) {
        display = <h3 style = {{display: "flex", justifyContent: "center"}}>This class does not exist!</h3>
    }
    else {
        name = c.className;
        teacherName = c.teacher.name;
        teacherEmail = c.teacher.email
        display = 
            <div>
                <h1 style = {{display: "flex", justifyContent: "center"}}>{name}</h1>
                <h3 style = {{display: "flex", justifyContent: "center"}}>{teacherName} ({teacherEmail})</h3>
                {changeTeacher}
                <h4 style = {{marginLeft: "2%"}}>Roster</h4>
                {rosterDisplay()}
                <div style = {{display: "flex", justifyContent: "center"}}>
                    {add}
                </div>
            </div>
    }

    return(
        <HeaderWrap headerName="Class Page">
            <div className="card p-4 m-4">
                {display}
            </div>
        </HeaderWrap>

    )
}