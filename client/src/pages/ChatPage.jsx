import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { ChatState } from "../context/ChatProvider";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import MyChats from "../components/miscellaneous/MyChats";
import ChatBox from "../components/miscellaneous/ChatBox";

function ChatPage() {
  const { user } = ChatState();
  console.log(user);

  return (
    <div>
      {user && <SideDrawer />}
      <div>
        {user && <MyChats />}
        {user && <ChatBox />}
      </div>
    </div>
  );
}

export default ChatPage;
