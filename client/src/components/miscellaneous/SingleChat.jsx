import React, { useContext } from "react";
import ChatContext from "../../context/ChatProvider";

function SingleChat({ fetchAgain, setFetchAgain }) {
  const { user, selectedChat, setSelectedChat } = useContext(ChatContext);

  const getSender = (loggedUser, users) => {
    return users[0]._id === loggedUser._id ? users[1].name : users[0].name;
  };

  return (
    <div>
      {selectedChat ? (
        <>
          <div>
            {!selectedChat.isGroupChat ? (
              <>{getSender(user, selectedChat.users)}</>
            ) : (
              <>
                <div>{selectedChat.chatName}</div>
              </>
            )}
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
