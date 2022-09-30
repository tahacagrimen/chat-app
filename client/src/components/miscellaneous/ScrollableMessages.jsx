import React, { useContext, useRef, useEffect } from "react";
import ChatContext from "../../context/ChatProvider";

function ScrollableMessages({ messages }) {
  const { user } = useContext(ChatContext);

  const bottomRef = useRef(null);

  const isSameSender = (user, message) => {
    if (message.sender._id === user._id) {
      return "bg-blue-500";
    } else {
      return "bg-red-500";
    }
  };

  console.log(messages);

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="h-full bg-slate-100 p-2 rounded-lg shadow-md  overflow-y-auto relative">
      {messages.map((message, index) => {
        return (
          <div
            key={index}
            className={`flex bottom-0 flex-row items-start justify-start w-full p-2 rounded-lg shadow-md my-2 ${isSameSender(
              user,
              message
            )}`}
          >
            <div className="flex flex-col items-start justify-start w-full">
              <div className="flex flex-row items-center justify-start w-full">
                <div className="flex flex-col items-start justify-start">
                  <div
                    ref={bottomRef}
                    className="flex flex-row items-center justify-start"
                  >
                    <p className="text-sm font-bold text-white">
                      {message.sender.name}
                    </p>
                    <p className="text-xs text-white ml-2">{message.content}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ScrollableMessages;
