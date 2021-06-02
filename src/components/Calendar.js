import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import HeaderWrap from './HeaderWrap';


export default function Calendar() {
  const [events, setEvents] = useState([]);

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


  function getDate(dayString) {
    const today = new Date();
    const year = today.getFullYear().toString();
    let month = (today.getMonth() + 1).toString();

    if (month.length === 1) {
      month = "0" + month;
    }

    return dayString.replace("YEAR", year).replace("MONTH", month);
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
      </HeaderWrap>
    </div>
  );
}
