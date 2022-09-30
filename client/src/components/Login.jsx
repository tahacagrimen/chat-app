import React from "react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      setLoading(false);
      toast("Please fill all the fields.", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/user/login",
        { email, password },
        config
      );
      toast("Login succesfull", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setLoading(false);
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/chats");
    } catch (error) {
      toast("Something went wrong", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
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
      <button
        className="px-8 py-2 w-full bg-slate-300 rounded-lg"
        onClick={() => submitHandler()}
      >
        Log In
      </button>
    </>
  );
}

export default Login;
