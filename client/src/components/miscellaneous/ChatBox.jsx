import React, { useContext } from "react";
import ChatContext from "../../context/ChatProvider";
import SingleChat from "./SingleChat";

function ChatBox({ fetchAgain, setFetchAgain }) {
  const { selectedChat } = useContext(ChatContext);

  return (
    <div className="w-full h-full">
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </div>
  );
}

export default ChatBox;
