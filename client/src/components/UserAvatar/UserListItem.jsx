import React from "react";

function UserListItem({ user, handleFunction }) {
  return (
    <div
      className="flex items-center my-4 border-solid border p-2 rounded-xl shadow-md hover:cursor-pointer"
      onClick={handleFunction}
    >
      <div className="w-10">
        <img className="rounded-full" src={user.pic} alt="" />
      </div>
      <div className="ml-2">
        <h1 className="font-semibold text-base">{user.name}</h1>
        <h2>{user.email}</h2>
      </div>
    </div>
  );
}

export default UserListItem;
