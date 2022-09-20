import axios from "axios";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import ChatContext from "../../context/ChatProvider";

function MyChats() {
  const [loggedUser, setLoggedUser] = useState();
  const { user, setUser, selectedChat, setSelectedChat, chats, setChats } =
    useContext(ChatContext);

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("/api/chat/", config);
      console.log(data);
      setChats(data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, []);

  return (
    <div>
      <div>
        {chats ? (
          chats.map((chat) => {
            return (
              <div
                key={chat._id}
                className="flex items-center my-4 border-solid border p-2
                rounded-xl shadow-md"
                onClick={() => setSelectedChat(chat)}
              ></div>
            );
          })
        ) : (
          <h1>No chats</h1>
        )}
      </div>
    </div>
  );
}

export default MyChats;
