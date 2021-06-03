import React from "react";
import "../styles/dashboard.css";
import DashboardForm from "./DashboardForm";

const Sidebar = ({
  numClasses,
  classForm,
  studentForm,
  setStudentForm,
  setClassForm,
  numTeachers,
  numStudents
}) => {
  return (
    <div className="sidebar">
      <div className="sidebarHeader">School Overview</div>
      <div className="sidebarInfo schoolSize">
        {numClasses} <span className="text-secondary">Classes</span>
      </div>
      <div className="sidebarInfo schoolSize">
        {numTeachers} <span className="text-secondary">Teachers</span>
      </div>

      <div className="sidebarInfo schoolSize d-flex">
        {numStudents} <span className="text-secondary">students</span>{" "}
        <div
          onClick={() => {
            setStudentForm(f => !f);
            setClassForm(false);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 justify-content-right"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
            />
          </svg>
        </div>
      </div>
      {classForm || studentForm ? (
        <DashboardForm
          f={classForm ? "class" : "student"}
          setStudentForm={setStudentForm}
          setClassForm={setClassForm}
        />
      ) : null}
    </div>
  );
};

export default Sidebar;
