import React, { useState } from "react";
import { AuthProvider } from "./../context/AuthProvider"
import axios from "axios"
import HeaderWrap from './HeaderWrap';

export default function ClassPage(props) {
    const id = props.match.params.id
    const [c, setClass] = useState(null)
    const [roster, setRoster] = useState([]);
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
                console.log(obj);
                for (let element of obj) {
                    if (element.classID === id) {
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
                        break;
                    }
                    else
                        name = "This class does not exist!"
                } //ends for

            }) //ends then
    } //ends fetchClasses

    const rosterDisplay = () => {
        if (roster.length === 0)
            return;
        console.log("\nList names:\n", roster)
        const nameList = <ul>
            {roster.map((cl) => (
                <li style={{ marginLeft: "5%" }} key={cl.id}>
                    {cl.name}
                    <button name={cl.id} onClick={removeStudent} style={{ margin: "0.5% 3%", marginBottom: "0.3%", padding: "0% 1%" }}>Remove Student</button>
                    <ul style={{ listStyleType: "square", marginLeft: "2%" }}>
                        <li>Email: {cl.id}</li>
                        <li>
                            Grade: {cl.grade}
                            <button name={cl.id} value={"😀"} onClick={changeGrade} style={{ marginLeft: "2%" }}>😀</button>
                            <button name={cl.id} value={"😐"} onClick={changeGrade} style={{ margin: "0% 1%", marginBottom: "1.5%" }}>😐</button>
                            <button name={cl.id} value={"🙁"} onClick={changeGrade}>🙁</button>
                        </li>
                    </ul>
                </li>
            ))}
        </ul>
        return (nameList);
    }

    const removeStudent = (e) => {
        // console.log(e.target.name);
        const email = e.target.name
        axios
            .delete("http://localhost:8000/classes/removeStudent", { data: { id: c.id, email: email } })
        fetchClasses();
    }

    const changeGrade = (e) => {
        const grade = e.target.value;
        const email = e.target.name;
        axios
            .put("http://localhost:8000/classes/grades", { id: c.id, grade: grade, email: email })
        fetchClasses();
    }

    if (c === null) {
        display = <h3 style={{ display: "flex", justifyContent: "center" }}>This class does not exist!</h3>
        fetchClasses();
    }
    else {
        name = c.className;
        teacherName = c.teacher.name;
        teacherEmail = c.teacher.email
        display =
            <div>
                <h1 style={{ display: "flex", justifyContent: "center" }}>{name}</h1>
                <h3 style={{ display: "flex", justifyContent: "center" }}>{teacherName} ({teacherEmail})</h3>
                <h4 style={{ marginLeft: "2%" }}>Roster</h4>
                {rosterDisplay()}
            </div>
    }

    return (
        <HeaderWrap headerName="Class Page">
            {display}
        </HeaderWrap>
    )
}