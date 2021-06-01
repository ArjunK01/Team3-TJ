import React, {useState} from "react";
import {AuthProvider} from "./../context/AuthProvider"
import axios from "axios"

export default function ClassPage(props) {
    const id = props.match.params.id
    const [c, setClass] = useState(null)
    let display;
    let name = "This class does not exist!" 
    let teacherName, teacherEmail, roster;

    const fetchClasses = () => {
        console.log("fetchClasses was called!");
        const url = new URL("http://localhost:8000/classes");

        fetch(url)
        .then((resp) => {
            return(resp.json());
        })
        .then((obj) => {
            console.log(obj);
            for(let element of obj) {
                if(element.classID === id)
                {
                    setClass(element);
                    break;
                }
                else
                    name = "This class does not exist!"
                    
            } //ends for
        }) //ends then
    } //ends fetchClasses

    const rosterDisplay = () => {
        console.log("here")
        if(!roster)
            return;
        const nameList = <ul>
            {roster.map((cl) => (
                    <li style = {{marginLeft: "5%"}}>
                        {cl.name} 
                        <button onClick = {removeStudent} style = {{margin: "0.5% 3%", marginBottom: "0.3%", padding: "0% 1%"}}>Remove Student</button>
                        <ul style = {{listStyleType: "square", marginLeft: "2%"}}>
                            <li>Email: {cl.email}</li>
                            <li>
                                Grade: {cl.grade}
                                <button onClick = {changeGrade} style = {{marginLeft: "2%"}}>😀</button>
                                <button onClick = {changeGrade} style = {{margin: "0% 1%", marginBottom: "1.5%"}}>😐</button>
                                <button onClick = {changeGrade}>🙁</button>
                            </li>
                        </ul>
                    </li>
            ))}
        </ul>
        return(nameList);
    }

    const removeStudent = () => {
        console.log("clicked")
    }

    const changeGrade = () => {
        axios
            .put("http://localhost:8000/classes/grades")
    }

    if(c === null) {
        display = <h3 style = {{display: "flex", justifyContent: "center"}}>This class does not exist!</h3>
        fetchClasses();
    }
    else {
        name = c.className;
        teacherName = c.teacher.name;
        teacherEmail = c.teacher.email
        roster = c.roster;
        display = 
            <div>
                <h1 style = {{display: "flex", justifyContent: "center"}}>{name}</h1>
                <h3 style = {{display: "flex", justifyContent: "center"}}>{teacherName} ({teacherEmail})</h3>
                <h4 style = {{marginLeft: "2%"}}>Roster</h4>
                {rosterDisplay()}
            </div>
    }

    return(
        display
    )
}