import axios from "axios";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import ChatContext from "../../context/ChatProvider";
import GroupChat from "./GroupChat";

function MyChats({ fetchAgain }) {
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
      setChats(data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, [fetchAgain]);

  const getSender = (loggedUser, users) => {
    return users[0]._id === loggedUser._id ? users[1].name : users[0].name;
  };

  return (
    <div className="w-4/12 mr-4 h-full max-h-screen overflow-y-auto p-2 mb-8 bg-slate-100">
      <div className="flex items-center justify-between">
        <h1 className="font-medium">My Chats</h1>
        <GroupChat />
      </div>
      <div>
        {chats ? (
          chats.map((chat) => {
            return (
              <div
                key={chat._id}
                className="flex items-center w-full my-2 border-solid border p-2
                rounded-xl shadow-md bg-slate-200"
                onClick={() => setSelectedChat(chat)}
              >
                <h1 className="font-medium">
                  {!chat.isGroupChat
                    ? getSender(loggedUser, chat.users)
                    : chat.chatName}
                </h1>
              </div>
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
