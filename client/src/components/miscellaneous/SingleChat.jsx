import React, { useContext, useState } from "react";
import ChatContext from "../../context/ChatProvider";
import ProfileModal from "./ProfileModal";
import UpdateGroupChat from "./UpdateGroupChat";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useEffect } from "react";
import ScrollableMessages from "./ScrollableMessages";
import { io } from "https://cdn.socket.io/4.3.2/socket.io.esm.min.js";

const ENDPOINT = "http://localhost:5000";
let socket, selectedChatCompare;

function SingleChat({ fetchAgain, setFetchAgain }) {
  const { user, selectedChat, setSelectedChat } = useContext(ChatContext);

  const [messages, setMessages] = useState([]);

  const [newMessage, setNewMessage] = useState("");

  const [loading, setLoading] = useState(false);

  const [socketConnected, setSocketConnected] = useState(false);

  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const getSender = (loggedUser, users) => {
    return users[0]._id === loggedUser._id ? users[1].name : users[0].name;
  };

  const getSenderFull = (loggedUser, users) => {
    return users[0]._id === loggedUser._id ? users[1] : users[0];
  };

  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      setLoading(true);
      const { data } = await axios.get(
        `/api/message/${selectedChat._id}`,
        config
      );

      setMessages(data);
      console.log(messages);
      setLoading(false);

      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      toast.error(error);
    }
  };

  const sendMessage = async (e) => {
    if (e.key === "Enter" && newMessage) {
      socket.emit("stop typing", selectedChat._id);
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        setNewMessage("");
        const { data } = await axios.post(
          "/api/message",
          {
            content: newMessage,
            chatId: selectedChat._id,
          },
          config
        );

        socket.emit("new message", data);
        setMessages([...messages, data]);
      } catch (error) {
        toast.error("Error sending message");
      }
    }
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => {
      setSocketConnected(true);
    });

    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
  }, []);

  useEffect(() => {
    fetchMessages();

    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  useEffect(() => {
    socket.on("message received", (newMessageReceived) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageReceived
      ) {
        // give notification
      } else {
        setMessages([...messages, newMessageReceived]);
      }
    });
  });

  const typingHandler = (e) => {
    setNewMessage(e.target.value);

    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }

    let lastTypingTime = new Date().getTime();
    let timerLength = 3000;

    setTimeout(() => {
      let timeNow = new Date().getTime();
      let timeDiff = timeNow - lastTypingTime;

      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  return (
    <div className="h-full">
      <ToastContainer />
      {selectedChat ? (
        <>
          <div>
            {!selectedChat.isGroupChat ? (
              <>
                <ProfileModal user={getSenderFull(user, selectedChat.users)} />
              </>
            ) : (
              <div className="flex items-center justify-between bg-slate-50 p-2 rounded-lg shadow-md">
                <div className="font-medium text-lg ml-2">
                  {selectedChat.chatName}
                </div>
                <UpdateGroupChat
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                  fetchMessages={fetchMessages}
                />
              </div>
            )}
          </div>
          <div>
            {loading ? (
              <div>Loading...</div>
            ) : (
              <div>
                <ScrollableMessages messages={messages} />
              </div>
            )}
            <form onKeyDown={sendMessage} className="">
              {isTyping ? <div>typing...</div> : null}
              <input
                className="w-full border-2 border-slate-200 rounded-lg p-2  mb-2"
                onChange={typingHandler}
                placeholder="Type a message"
                value={newMessage}
              />
            </form>
          </div>
        </>
      ) : (
        <div>
          <h1>No chat selected</h1>
        </div>
      )}
    </div>
  );
}

export default SingleChat;
