import React, { useContext } from "react";
import ChatContext from "../../context/ChatProvider";

function ScrollableMessages({ messages }) {
  const { user } = useContext(ChatContext);

  const isSameSender = (messages, message, index, userId) => {
    return (
      index < messages.length - 1 &&
      (messages[index + 1].sender !== message.sender ||
        messages[index + 1].sender === undefined) &&
      messages[index + 1].sender !== userId
    );
  };

  const isLastMessage = (messages, index, userId) => {
    return (
      index === messages.length - 1 &&
      messages[messages.length - 1].sender !== userId &&
      messages[messages.length - 1].sender
    );
  };

  const isSameSenderMargin = (messages, message, index, userId) => {
    if (
      index < messages.length - 1 &&
      messages[index + 1].sender === message.sender &&
      messages[index + 1].sender !== userId
    )
      return 4;
    else if (
      (index < messages.length - 1 &&
        messages[index + 1].sender !== message.sender &&
        messages[index + 1].sender !== userId) ||
      (index === messages.length - 1 && messages[index].sender !== userId)
    )
      return 0;
    else return "auto";
  };

  const isSameUser = (messages, message, index) => {
    return index > 0 && messages[index - 1].sender === message.sender;
  };

  return (
    <div>
      {messages &&
        messages.map((message, index) => (
          <div key={message._id}>
            {isSameSender(messages, message, index, user._id) ||
              (isLastMessage(messages, index, user._id) && (
                <div className="message-sender bg-slate-500">
                  <img src={message.sender.pic} alt="" />
                  <div>{message.content}</div>
                </div>
              ))}
          </div>
        ))}
    </div>
  );
}

export default ScrollableMessages;
