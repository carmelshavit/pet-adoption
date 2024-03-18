import React from "react";

const UserPreview = ({ user, field }) => {
  return (
    <div className="user-preview">
      <p>{user[field]}</p>
    </div>
  );
};

export default UserPreview;
