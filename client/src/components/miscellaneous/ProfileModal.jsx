import React from "react";

function ProfileModal({ user }) {
  return (
    <div className="flex items-center justify-between bg-slate-50 p-2 rounded-lg shadow-md">
      <div>
        <div className="font-medium text-lg">{user.name}</div>
        <div className="font-medium text-sm">{user.email}</div>
      </div>
      <img
        className="w-9 h-9 rounded-full border-solid border border-gray-900 "
        src={user.pic}
        alt=""
      />
    </div>
  );
}

export default ProfileModal;
