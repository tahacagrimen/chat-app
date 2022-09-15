import React from "react";
import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = () => {};

  return (
    <>
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
      <button className="px-8 py-2 w-full bg-slate-300" onClick={submitHandler}>
        Log In
      </button>
      <button
        className="px-8 py-2 w-full bg-slate-500"
        onClick={() => {
          setEmail("guest@example.com");
          setPassword("123456");
        }}
      >
        Guest Login
      </button>
    </>
  );
}

export default Login;