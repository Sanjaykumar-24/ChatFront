import React, { useEffect, useRef, useState } from "react";
import Empty from "../components/Empty";
import ChatList from "../components/ChatList/ChatList";
import { useStateProvider } from "../context/StateContext";
import Chat from "../components/Chat";
import axios from "axios";
import { GET_MESSAGES_ROUTE, HOST } from "../utils/ApiRoutes";
import { reducerCases } from "../context/Constants";
import { io } from "socket.io-client";

const ChatPage = () => {
  const socket = useRef();
  const [socketEvent, setSocketEvent] = useState(false);
  const [{ userInfo, currentChatUser }, dispatch] = useStateProvider();

  useEffect(() => {
    if (userInfo) {
      socket.current = io(HOST);
      // console.log("SOCKET", socket.current);
      socket.current.emit("add-user", userInfo.id);
      dispatch({ type: reducerCases.SET_SOCKET, socket });
    }
  }, [userInfo]);

  useEffect(() => {
    if (socket.current && !socketEvent) {
      socket.current.on("msg-receive", (data) => {
        // console.log("DATA", data);
        dispatch({
          type: reducerCases.ADD_MESSAGE,
          newMessage: {
            ...data.message,
          },
        });
      });

      setSocketEvent(true);
    }
  }, [socket.current]);

  useEffect(() => {
    const getMessages = async () => { 
      // console.log(userInfo, "in APP", currentChatUser.data);
      const {
        data: { messages },
      } = await axios.get(
        `${GET_MESSAGES_ROUTE}/${userInfo.id}/${currentChatUser.data._id}`
      );
      
      dispatch({ type: reducerCases.SET_MESSAGES, messages });
    };
    if (currentChatUser) {
      getMessages();
    }
  }, [currentChatUser]);
  return (
    <>
      <div className="grid grid-cols-main h-screen w-screen max-h-screen max-w-full overflow-hidden">
        <ChatList></ChatList>
        {currentChatUser ? <Chat></Chat> : <Empty></Empty>}
      </div>
    </>
  );
};

export default ChatPage;
