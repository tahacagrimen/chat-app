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
      console.log(chats);
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
              >
                <div>
                  {!chat.isGroupChat
                    ? getSender(loggedUser, chat.users)
                    : chat.chatName}
                </div>
              </div>
            );
          })
        ) : (
          <h1>No chats</h1>
        )}
      </div>
      <GroupChat />
    </div>
  );
}

export default MyChats;
