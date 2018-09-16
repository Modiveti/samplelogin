import React from "react";
import "./UserName.css";

const UserName = ({ firstName, lastName }) => {
  return (
    <div style = {{ color: "white" }}>
      {firstName &&
        lastName && (
          <div className="nav-username">
            <div className="initial-circle">
              {firstName[0].toUpperCase()}
              {lastName[0].toUpperCase()}
            </div>Hello, {firstName}
          </div>
        )}
    </div>
  );
};

export default UserName;
