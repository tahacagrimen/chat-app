import React from "react";

function ProfileModal({ user }) {
  return (
    <div>
      <div>{user.name}</div>
      <div>{user.email}</div>
      <img src={user.pic} alt="" />
    </div>
  );
}

export default ProfileModal;
