import React, {useState} from "react";
import {AuthProvider} from "./../context/AuthProvider"

export default function ClassPage(id) {
    const [c, setClass] = useState(null)
    // const [name, setName] = useState("");
    // const [teacher, setTeacher] = useState("");
    // const [roster, setRoster] = useState();
    let name, teacherName, teacherEmail, roster;
    const fetchClasses = () => {
        // let a, b, c, d;
        console.log("fetchClasses was called!");
        const url = new URL("http://localhost:8000/classes");

        fetch(url)
        .then((resp) => {
            return(resp.json());
        })
        .then((obj) => {
            console.log(obj);
            for(let element of obj) {
                if(element.classID === id.id)
                {
                    setClass(element);
                    // let {a, b, c, d} = element.keys;
                    // console.log("A:", a);
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
                                <button style = {{marginLeft: "2%"}}>😀</button>
                                <button style = {{margin: "0% 1%", marginBottom: "1.5%"}}>😐</button>
                                <button>🙁</button>
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

    if(c === null)
        fetchClasses();
    else
    {
        name = c.className;
        teacherName = c.teacher.name;
        teacherEmail = c.teacher.email
        roster = c.roster;
    }

    return(
        <div>
            {console.log(c)}
            <h1 style = {{display: "flex", justifyContent: "center"}}>{name}</h1>
            <h3 style = {{display: "flex", justifyContent: "center"}}>{teacherName} ({teacherEmail})</h3>
            <h4 style = {{marginLeft: "2%"}}>Roster</h4>
            {rosterDisplay()}

        </div>
    )
}