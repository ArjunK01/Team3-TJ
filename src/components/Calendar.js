import React from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

export default function Calendar() {
  const events = [{ title: "today's event", date: new Date() }];

//   const [event, setEvent] = useState(null)

//     const getEvents = () => { // get events from the firebase dashboard in order to add to the calendar
//         fetch('http://localhost:8000') // need server for events
//         .then((resp) => {
//             return resp.json();
//         })
//         .then((obj) => {
//             setEvent(obj)
//         })
//     }



  return (
    <div className="App">
      <FullCalendar
        defaultView="dayGridMonth"
        plugins={[dayGridPlugin]}
        events={events}
      />
    </div>
  );
}
