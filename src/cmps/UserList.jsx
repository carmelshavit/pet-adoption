import React from "react";
import userPreview from "./UserPreview";

export default function userList({ users, handleuserClick }) {
  return (
    <div>
      <ul className="user-list">
        {users.map((user, index) => (
          <li key={index} onClick={() => handleuserClick(user.id)}>
            <userPreview user={user} key={user.id} />
          </li>
        ))}
      </ul>
    </div>
  );
}
