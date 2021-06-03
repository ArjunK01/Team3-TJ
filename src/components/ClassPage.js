import React, {useState} from "react";
import {AuthProvider} from "./../context/AuthProvider"
import axios from "axios"
import HeaderWrap from './HeaderWrap';
// import {response} from "express"

export default function ClassPage(props) {
    const id = props.match.params.id
    const [c, setClass] = useState(null)
    const [roster, setRoster] = useState([]);
    const [add, setAdd] = useState();
    const [changeTeacher, setChangeTeacher] = useState();
    const [tFName, setTFName] = useState("");
    const [tLName, setTLName] = useState("");
    const [tEmail, setTEmail] = useState("");
    const [docID, setDocID] = useState();
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
                // console.log(obj);
                for (let element of obj) {
                    if (element.classID === id) {
                        setDocID(element.id);
                        setTFName(element.teacher.name);
                        setTEmail(element.teacher.email);
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
        // console.log("\nList names:\n", roster)
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

    const handleChange = (e) => {
        // console.log(e.target.id);
        switch (e.target.id) {
            case "tFName":
                // console.log(e.target.value)
                setTFName(e.target.value);
                break;
            case "tLName":
                setTLName(e.target.value);
                break;
            case "tEmail":
                setTEmail(e.target.value);
                break;
            default:
                break;
        }
    }

    const editTeacher = (e) => {
        // console.log(tFName);
        const fName = document.getElementById("tFName").value;
        const lName = document.getElementById("tLName").value;
        const tEmail = document.getElementById("tEmail").value;

        if(tEmail === "") {
            alert("An email must be entered!");
            return;
        }
        axios
            .put("http://localhost:8000/classes/editTeacher", {id: docID, email: tEmail, fName: fName, lName: lName})
        fetchClasses();
    }

    const generateTeacherChange = (e) => {
        // console.log("should only happen once");
        const names = tFName.split();
        // console.log(names);
        setTFName(names[0]);
        setTLName(names[names.length - 1]);
        // console.log(tFName)
        setChangeTeacher(<form onSubmit = {editTeacher}>
            <input id = "tFName" type = "text" onChange = {handleChange} placeholder = "Enter updated first name here" />
            <input id = "tLName" type = "text" placeholder = "Enter updated last name here" onChange = {handleChange}/>
            <input id = "tEmail" type = "text" placeholder = "Enter updated teacher email here" onChange = {handleChange}/>
            <input type = "submit"/>
        </form>)
    }

    const removeStudent = (e) => {
        // console.log(e.target.name);
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
        e.preventDefault();
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
            fetchClasses();
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

    if(c === null) {
        display = <h3 style = {{display: "flex", justifyContent: "center"}}>This class does not exist!</h3>
        fetchClasses();
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