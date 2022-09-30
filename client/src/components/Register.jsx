import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pic, setPic] = useState("");
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  // const postDetails = (pic) => {
  //   setLoading(true);
  //   if (pic === undefined) {
  //     toast("🦄 Wow so easy!", {
  //       position: "top-right",
  //       autoClose: 5000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //     });
  //     return;
  //   }

  //   if (pic.type !== "image/jpeg" && pic.type !== "image/png") {
  //     const data = new FormData();
  //     data.append("file", pic);
  //     data.append("upload_preset", "chat app");
  //     data.append("cloud_name", "dnkfda6tr");
  //     fetch("https://api.cloudinary.com/v1_1/dnkfda6tr/image/upload", {
  //       method: "POST",
  //       body: data,
  //     }).then((res) => {
  //       res
  //         .json()
  //         .then((data) => {
  //           setPicture(data.url.toString());
  //           setLoading(false);
  //           console.log(picture);
  //         })
  //         .catch((err) => {
  //           console.log(err);
  //         });
  //     });
  //   } else {
  //     toast("🦄 Wow so easy!", {
  //       position: "top-right",
  //       autoClose: 5000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //     });
  //   }
  // };

  const submitHandler = async () => {
    setLoading(true);
    if (!name || !email || !password || !confirmPassword) {
      toast("Please fill all the fields.", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      toast("Passwords do not match.", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/user",
        { name, email, password, pic },
        config
      );
      toast("Sign up succesfull", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      localStorage.setItem("userInfo", JSON.stringify(data));

      setLoading(false);
      navigate("/chats");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ToastContainer />
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
        type="text"
        placeholder="your pics url"
        className="border-solid border rounded-xl my-2 p-2 w-full"
        onChange={(e) => setPic(e.target.value)}
      />
      <button
        className="px-8 py-2 w-full bg-slate-500 rounded-lg"
        onClick={(e) => submitHandler(e)}
      >
        Sign Up
      </button>
    </>
  );
}

export default Register;
