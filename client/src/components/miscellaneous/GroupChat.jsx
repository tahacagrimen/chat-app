import axios from "axios";
import React, { useContext, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import ChatContext from "../../context/ChatProvider";
import UserListItem from "../UserAvatar/UserListItem";

function GroupChat({ children }) {
  const [groupChatName, setGroupChatName] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user, setUser, selectedChat, setSelectedChat, chats, setChats } =
    useContext(ChatContext);

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
      setLoading(false);
      setSearchResult(data);
      console.log(searchResult);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!groupChatName || !selectedUsers) {
      toast.error("Please fill all the fields");
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post(
        "/api/chat/group",
        {
          chatName: groupChatName,
          users: JSON.stringify(selectedUsers.map((user) => user._id)),
        },
        config
      );

      setChats([data, ...chats]);

      toast.success("Group chat created successfully");

      setGroupChatName("");
      setSelectedUsers([]);
      setSearch("");
      setSearchResult([]);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleGroup = async (userToAdd) => {
    if (selectedUsers.includes(userToAdd)) {
      toast.error("User already added");
      return;
    }
    setSelectedUsers([...selectedUsers, userToAdd]);
  };

  const handleDelete = (userToDelete) => {
    setSelectedUsers(selectedUsers.filter((user) => user !== userToDelete));
  };

  return (
    <div>
      <ToastContainer />
      <h1>Create Group Chat</h1>
      <div>
        <form>
          <input
            type="text"
            placeholder="Chat Name"
            onChange={(e) => setGroupChatName(e.target.value)}
            value={groupChatName}
          />
          <input
            type="text"
            placeholder="Add Users"
            onChange={(e) => handleSearch(e.target.value)}
            value={search}
          />
          <button type="submit" onClick={handleSubmit}>
            Create
          </button>
        </form>
        {!selectedUsers ? null : (
          <div className="flex items-center justify-center">
            {selectedUsers.map((user) => (
              <div
                className="p-1 bg-red-400 mx-2 mt-4 rounded-lg"
                key={user._id}
                onClick={() => handleDelete(user)}
              >
                <p>
                  {user.name} <span>X</span>
                </p>
              </div>
            ))}
          </div>
        )}

        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <div>
            {searchResult?.slice(0, 5).map((user) => (
              <UserListItem
                key={user._id}
                user={user}
                handleFunction={() => handleGroup(user)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default GroupChat;
