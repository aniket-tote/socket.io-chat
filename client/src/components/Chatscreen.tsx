import React from "react";
import LeftMessage from "./LeftMessage";
import RightMessage from "./RightMessage";
import { io } from "socket.io-client";

const Chatscreen = ({
  userName,
  messages,
  setMessages,
  userMessage,
  sendMessage,
  setUserMessage,
}: any) => {
  return (
    <div className="chatscreen">
      <div className="grpnameheader">
        <span className="grpname">G-6</span>
      </div>
      <div className="messageBox">
        {messages.map((e: any, i: any) => {
          return e.position === "left" ? (
            <LeftMessage key={i} message={e.message} name={e.name} />
          ) : (
            <RightMessage key={i} message={e.message} name={e.name} />
          );
        })}
      </div>
      <form
        className="sendMessageDiv"
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage(userMessage);
          setMessages((prev: any) => [
            ...prev,
            { position: "right", name: userName, message: userMessage },
          ]);
          setUserMessage("");
        }}
      >
        <input
          type="text"
          placeholder="your mesage here"
          value={userMessage}
          onChange={(e) => {
            setUserMessage(e.target.value);
          }}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chatscreen;
