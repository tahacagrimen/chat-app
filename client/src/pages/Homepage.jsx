import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Login from "../components/Login";
import Register from "../components/Register";

function Homepage() {
  const [isLogin, setIsLogin] = useState(true);

  let navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (userInfo) {
      navigate("/chats");
    }
  }, [navigate]);

  return (
    <div className="flex items-center justify-center flex-col max-w-xl h-auto border-solid border rounded-xl p-8 -">
      <div>
        <h1 className="text-2xl sm:text-3xl text-center p-4">
          Welcome to the Chat App
        </h1>
      </div>
      <div
        className="mt-4 grid grid-cols-2 divide-x-2
      border-solid border rounded-xl w-full"
      >
        <button
          onClick={() => {
            if (!isLogin) {
              setIsLogin(true);
            } else {
              return;
            }
          }}
          className={`px-8 py-2 ${
            isLogin ? "bg-blue-300" : "bg-white"
          } rounded-lg`}
        >
          Log In
        </button>
        <button
          onClick={() => {
            if (isLogin) {
              setIsLogin(false);
            } else {
              return;
            }
          }}
          className={`px-8 py-2 ${
            !isLogin ? "bg-blue-300" : "bg-white"
          } rounded-lg`}
        >
          Sign Up
        </button>
      </div>
      <div className="w-full mt-4">
        <form>{isLogin ? <Login /> : <Register />}</form>
      </div>
    </div>
  );
}

export default Homepage;
