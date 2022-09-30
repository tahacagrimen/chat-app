import React from "react";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import ChatContext from "../context/ChatProvider";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import MyChats from "../components/miscellaneous/MyChats";
import ChatBox from "../components/miscellaneous/ChatBox";

function ChatPage() {
  const { user, setUser } = useContext(ChatContext);
  const [fetchAgain, setFetchAgain] = useState(false);

  return (
    <div className="flex flex-col items-start justify-start w-full h-full bg-slate-200 m-0 p-0 fixed">
      {user && <SideDrawer />}
      <div className="flex flex-row items-start justify-between w-full h-full p-4">
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </div>
    </div>
  );
}

export default ChatPage;
