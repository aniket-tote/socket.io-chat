import React from "react";
import "./App.css";
import Chatscreen from "./components/Chatscreen";
import { io } from "socket.io-client";

function App() {
  const [socket, setSocket] = React.useState<SocketIOClient.Socket | null>(
    null
  );

  const [userName, setUserName] = React.useState<string>("");
  const [show, setShow] = React.useState<boolean>(false);

  const [messages, setMessages] = React.useState<
    Array<{ position: string; name: string; message: string }>
  >([{ position: "left", name: "admin", message: "Welcome to the club!" }]);

  const [userMessage, setUserMessage] = React.useState<string>("");

  React.useEffect(() => {
    const newSocket = io("http://localhost:3000");
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const joinRoom = (userName: string) => {
    socket?.emit("new-user-joined", userName);
    setShow(true);
  };

  const sendMessage = () => {
    if (userMessage.trim() !== "") {
      socket?.emit("send", userMessage);
      setUserMessage("");
    }
  };

  React.useEffect(() => {
    if (socket) {
      socket.on("user-joined", (name: string) => {
        setMessages((prev) => [
          ...prev,
          {
            position: "left",
            name: "admin",
            message: `${name} joined the chat`,
          },
        ]);
      });

      socket.on("receive", (res: { message: string; name: string }) => {
        setMessages((prev) => [
          ...prev,
          { position: "left", name: res.name, message: res.message },
        ]);
      });

      socket.on("disconnected", (message: string) => {
        setMessages((prev) => [
          ...prev,
          { position: "left", name: "admin", message: message },
        ]);
      });
    }
  }, [socket]);

  return (
    <div className="app">
      <div className="heading">Socket.io-Chat</div>
      {!show && (
        <form
          className="takeUsernameForm"
          onSubmit={(e) => {
            e.preventDefault();
            joinRoom(userName);
          }}
        >
          <input
            type="text"
            placeholder="your name"
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
          <button type="submit">Enter</button>
        </form>
      )}
      {show && (
        <Chatscreen
          userName={userName}
          messages={messages}
          setMessages={setMessages}
          userMessage={userMessage}
          setUserMessage={setUserMessage}
          sendMessage={sendMessage}
        />
      )}
    </div>
  );
}

export default App;
