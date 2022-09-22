import React, { useContext } from "react";
import { useState } from "react";
import ChatContext from "../../context/ChatProvider";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import UserListItem from "../UserAvatar/UserListItem";

function UpdateGroupChat({ fetchAgain, setFetchAgain, fetchMessages }) {
  const [groupChatName, setGroupChatName] = useState();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [renameloading, setRenameLoading] = useState(false);

  const { selectedChat, setSelectedChat, user } = useContext(ChatContext);

  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`/api/user?search=${search}`, config);
      console.log(data);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  const handleRename = async () => {
    if (!groupChatName) return;

    try {
      setRenameLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        `/api/chat/rename`,
        {
          chatId: selectedChat._id,
          chatName: groupChatName,
        },
        config
      );

      console.log(data._id);
      // setSelectedChat("");
      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setRenameLoading(false);
    } catch (error) {
      toast.error(error.message);
      setRenameLoading(false);
    }
    setGroupChatName("");
  };

  const handleAddUser = async (user1) => {
    if (selectedChat.users.find((u) => u._id === user1._id)) {
      toast.error("User already in the group");
      return;
    }

    if (selectedChat.groupAdmin._id !== user._id) {
      toast({
        title: "Only admins can add someone!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        `/api/chat/groupadd`,
        {
          chatId: selectedChat._id,
          userId: user1._id,
        },
        config
      );

      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setLoading(false);
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
    setGroupChatName("");
  };

  const handleRemove = async (user1) => {
    if (selectedChat.groupAdmin._id !== user._id && user1._id !== user._id) {
      toast.error("Only admins can remove someone!");
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        `/api/chat/groupdelete`,
        {
          chatId: selectedChat._id,
          userId: user1._id,
        },
        config
      );

      user1._id === user._id ? setSelectedChat() : setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      //   fetchMessages();
      setLoading(false);
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
    setGroupChatName("");
  };

  return (
    <div>
      <ToastContainer />
      <h1>{selectedChat.chatName}</h1>
      <div>
        {selectedChat.users.map((user) => (
          <div onClick={(u) => handleRemove(u)} key={user._id}>
            {user.name}
          </div>
        ))}
      </div>
      <div>
        <form>
          <input
            type="text"
            placeholder="Search for users"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </form>
        <div>
          {loading ? (
            <div>Loading...</div>
          ) : (
            searchResult?.map((user) => (
              <UserListItem
                key={user._id}
                user={user}
                handleFunction={(u) => handleAddUser(u)}
              />
            ))
          )}
        </div>
        <div>
          <button onClick={(u) => handleRemove(u)}>Leave Group</button>
        </div>
      </div>
    </div>
  );
}

export default UpdateGroupChat;
