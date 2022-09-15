import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";

function ChatPage() {
  const [chats, setChats] = useState([]);

  const fetchChats = async () => {
    const data = await axios.get("/api/chats");

    setChats(data.data);
  };

  useEffect(() => {
    fetchChats();
  }, []);

  return <div>ChatPage</div>;
}

export default ChatPage;
