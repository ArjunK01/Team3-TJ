import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { ClassesContext } from "../context/ClassesProvider";
import "../styles/dashboard.css";

const ClassCard = ({ c, user }) => {
  const { rerender, setRerender } = useContext(ClassesContext);
  const history = useHistory();

  const deleteClass = () => {
    axios({
      method: "delete",
      url: "http://localhost:8000/classes",
      headers: {},
      data: {
        id: c.id
      }
    }).then(res => setRerender(r => !r));
  };

  const [size, setSize] = useState(0);
  useEffect(() => {
    axios
      .get("http://localhost:8000/classes/roster?id=" + c.id)
      .then(res => setSize(res.data.length));
  }, []);

  return (
    <div
      className="classCard"
      onClick={e => {
        if (!e) var e = window.event;
        e.cancelBubble = true;
        if (e.stopPropagation) e.stopPropagation();
        history.push(`/class/${c.classId}`);
      }}
    >
      <div className="classId">{c.classId}</div>
      <div className="className mb-1">{c.className}</div>
      <div className="classTeacher">Teacher: {c.teacher}</div>
      <div className="cardBottom">
        <div className="classSize text-secondary">{size} Students</div>
        {user && user.isAdmin && (
          <div
            onClick={e => {
              if (!e) var e = window.event;
              e.cancelBubble = true;
              if (e.stopPropagation) e.stopPropagation();
              deleteClass();
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClassCard;
