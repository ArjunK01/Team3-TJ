import React, { useEffect, useState, useContext } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import HeaderWrap from './HeaderWrap';
import axios from "axios"
import {Button} from "@material-ui/core";
import { AuthContext } from "../context/AuthProvider";
import { Redirect } from "react-router-dom";





export default function Calendar() {
  const [events, setEvents] = useState([]);
  const [add, setAdd] = useState(false);
  const { user } = useContext(AuthContext);



  useEffect(() => {
    fetch('http://localhost:8000/events')
      .then(async (res) => {
        const results = await res.json();
        let arr = [];
        results.forEach((result) => {
          arr.push({
            title: result.description,
            start: getDate(result.date)
          })
        })
        setEvents(arr);
      })
  }, [])


  const addEvent = (e) => {
    e.preventDefault();
    const newDate = document.getElementById("date").value;
    const newDescription = document.getElementById("description").value;
    axios
      .post("http://localhost:8000/events/add", {date: newDate, description: newDescription})
      .then((response) => {
        console.log(response);
      }, (error) => {
        console.log(error);
      });  }




  function getDate(dayString) {
    const today = new Date();
    const year = today.getFullYear().toString();
    let month = (today.getMonth() + 1).toString();

    if (month.length === 1) {
      month = "0" + month;
    }

    return dayString.replace("YEAR", year).replace("MONTH", month);
  }
  if (!user) {
    return <Redirect to="/login" />;
  }


  return (
    <div>
      <HeaderWrap headerName={"Calendar"}>
        <div className="card m-2 p-4">
          <FullCalendar
            defaultView="dayGridMonth"
            header={{
              left: "prev,next",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay"
            }}
            plugins={[dayGridPlugin, timeGridPlugin]}
            events={events}
          />

        </div>
        <div  className="text-center">
        {user.isAdmin && <h4>To Add An Event Enter Date And Description</h4>}
       {user.isAdmin &&  <button type="button" class="btn btn-lite" onClick={()=>setAdd(true)}>Add An Event</button>} 
       {add && user.isAdmin && <form onSubmit = {addEvent}>
        <input id = "date" type = "text" placeholder = "Enter date here"/>
        <input id = "description" type = "text" placeholder = "Enter description here"/>
        <input type = "submit"/>
        </form>}
      </div>
      </HeaderWrap>
    </div>
  );
}


