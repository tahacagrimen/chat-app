import React, { useState } from "react";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [picture, setPicture] = useState("");

  const postDetails = (e) => {};

  const submitHandler = () => {};

  return (
    <>
      <h2>Name</h2>
      <input
        type="text"
        placeholder="name"
        className="border-solid border rounded-xl my-2 p-2 w-full"
        onChange={(e) => setName(e.target.value)}
      />
      <h2>E-mail</h2>
      <input
        type="text"
        placeholder="email"
        className="border-solid border rounded-xl my-2 p-2 w-full"
        onChange={(e) => setEmail(e.target.value)}
      />
      <h2>Password</h2>
      <input
        type="password"
        placeholder="password"
        className="border-solid border rounded-xl my-2 p-2 w-full"
        onChange={(e) => setPassword(e.target.value)}
      />
      <h2>Confirm Password</h2>
      <input
        type="password"
        placeholder="confirm password"
        className="border-solid border rounded-xl my-2 p-2 w-full"
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <h2>Profile Picture</h2>
      <input
        type="file"
        accept="image/*"
        placeholder="profile picture"
        className="border-solid border rounded-xl my-2 p-2 w-full"
        onChange={(e) => postDetails(e.target.value)}
      />
      <button className="px-8 py-2 w-full bg-slate-500" onClick={submitHandler}>
        Sign Up
      </button>
    </>
  );
}

export default Register;
