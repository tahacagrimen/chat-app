import React, { useContext, useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import ChatContext from "../../context/ChatProvider";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import Loading from "./Loading";
import UserListItem from "../UserAvatar/UserListItem";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Dialog, Menu, Transition } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function SideDrawer() {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  // modal state
  const [open, setOpen] = useState(false);

  const { user, setUser, selectedChat, setSelectedChat, chats, setChats } =
    useContext(ChatContext);

  let navigate = useNavigate();

  const logoutHandler = async () => {
    await localStorage.removeItem("userInfo");
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

      if (!chats.find((chat) => chat._id === data._id)) {
        setChats([data, ...chats]);
      }
      setSelectedChat(data);
      setLoadingChat(false);
      setOpen(false);
      setSearchResults([]);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-between flex-row w-full p-2 h-16 bg-slate-400">
      <div
        id="search-button"
        className="p-1 h-12 flex items-center justify-center border-solid border-2 rounded-lg bg-slate-200 hover:cursor-pointer shadow-lg"
      >
        <button onClick={() => setOpen(true)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
        <Transition.Root show={open} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={setOpen}>
            <Transition.Child
              as={Fragment}
              enter="ease-in-out duration-500"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in-out duration-500"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>
            <div className="fixed inset-0 overflow-hidden">
              <div className="absolute inset-0 overflow-hidden">
                <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                  <Transition.Child
                    as={Fragment}
                    enter="transform transition ease-in-out duration-500 sm:duration-700"
                    enterFrom="translate-x-full"
                    enterTo="translate-x-0"
                    leave="transform transition ease-in-out duration-500 sm:duration-700"
                    leaveFrom="translate-x-0"
                    leaveTo="translate-x-full"
                  >
                    <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                      <Transition.Child
                        as={Fragment}
                        enter="ease-in-out duration-500"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in-out duration-500"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <div className="absolute top-0 left-0 -ml-8 flex pt-4 pr-2 sm:-ml-10 sm:pr-4">
                          <button
                            type="button"
                            className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                            onClick={() => setOpen(false)}
                          >
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </Transition.Child>
                      <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                        <div className="px-4 sm:px-6">
                          <Dialog.Title className="text-lg font-medium text-gray-900">
                            Search Chats
                            <br />
                            <input
                              className="p-2"
                              placeholder="Search by name or email"
                              onChange={(e) => setSearch(e.target.value)}
                            />
                            <button
                              className="ml-2 p-2 bg-slate-300 rounded-md"
                              onClick={handleSearch}
                            >
                              Go
                            </button>
                          </Dialog.Title>
                        </div>
                        <div className="relative mt-6 flex-1 px-4 p sm:px-6">
                          <div className="absolute inset-0 px-4 sm:px-6">
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
                            <div className="h-full" aria-hidden="true" />
                          </div>
                        </div>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      </div>
      <div
        id="logo"
        className="sm:visible invisible font-semibold text-2xl backdrop-blur-sm"
      >
        Chat App
      </div>
      <div id="not-profile" className="flex items-center justify-center">
        {/* PROFILE BUTTON */}
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button>
              <div id="profile">
                <div className="flex items-center justify-center p-1 border-solid border-2 rounded-lg bg-slate-200 hover:cursor-pointer shadow-lg h-12">
                  <img
                    src={user.pic}
                    className="w-8 h-8 rounded-full border-solid border-2 border-slate-600"
                    alt=""
                  />
                  <div className="flex flex-col items-end justify-center">
                    <h2 className="ml-2 text-lg font-medium">{user.name}</h2>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={3}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </Menu.Button>
          </div>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={logoutHandler}
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      Log Out
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
}
