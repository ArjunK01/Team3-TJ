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
  numStudents,
  isAdmin
}) => {
  return (
    <div className="sidebar">
      <div className="sidebarHeader row ml-2">School Overview</div>
      <div className="sidebarInfo row ml-2">
        {numClasses} <span className="text-secondary ml-2 mt-1">Classes</span>
      </div>
      <div className="sidebarInfo row ml-2">
        {numTeachers} <span className="text-secondary ml-2 mt-1">Teachers</span>
      </div>

      <div className="sidebarInfo row ml-2">
        {numStudents} <span className="text-secondary ml-2 mt-1">students</span>
        {isAdmin && <div
          onClick={() => {
            setStudentForm(f => !f);
            setClassForm(false);
          }}
        >
          <i class="fas fa-user-plus text-muted schoolSize mr-2"></i>
        </div>}
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
