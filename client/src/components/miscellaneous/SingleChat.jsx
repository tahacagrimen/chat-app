import React, { useContext } from "react";
import ChatContext from "../../context/ChatProvider";
import ProfileModal from "./ProfileModal";
import UpdateGroupChat from "./UpdateGroupChat";

function SingleChat({ fetchAgain, setFetchAgain }) {
  const { user, selectedChat, setSelectedChat } = useContext(ChatContext);

  const getSender = (loggedUser, users) => {
    return users[0]._id === loggedUser._id ? users[1].name : users[0].name;
  };

  const getSenderFull = (loggedUser, users) => {
    return users[0]._id === loggedUser._id ? users[1] : users[0];
  };

  return (
    <div>
      {selectedChat ? (
        <>
          <div>
            {!selectedChat.isGroupChat ? (
              <>
                {getSender(user, selectedChat.users)}
                <ProfileModal user={getSenderFull(user, selectedChat.users)} />
              </>
            ) : (
              <>
                <div>{selectedChat.chatName}</div>
                <UpdateGroupChat
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                />
              </>
            )}
            <div></div>
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
