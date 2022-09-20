import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import ChatContext from "../../context/ChatProvider";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import Loading from "./Loading";
import UserListItem from "../UserAvatar/UserListItem";

function SideDrawer() {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  const { user, setUser, selectedChat, setSelectedChat, chats, setChats } =
    useContext(ChatContext);

  let navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  const handleSearch = async (e) => {
    if (!search) {
      toast.error("Please enter a username or email");
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
      setSearchResults(data);
      setSearch("");
      console.log(data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post("/api/chat/", { userId }, config);
      setSelectedChat(data);
      setLoadingChat(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <ToastContainer />
      <div></div>
      <input
        placeholder="Search by name or email"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={handleSearch}>Go</button>
      {loading ? (
        <Loading />
      ) : (
        searchResults?.map((user) => (
          <UserListItem
            key={user._id}
            user={user}
            handleFunction={() => accessChat(user._id)}
          />
        ))
      )}
    </>
  );
}

export default SideDrawer;
