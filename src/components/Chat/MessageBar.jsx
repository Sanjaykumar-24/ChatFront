import React, { useState } from "react";
import { BsEmojiSmile } from "react-icons/bs";
import { FaMicrophone } from "react-icons/fa";
import { ImAttachment } from "react-icons/im";
import { MdSend } from "react-icons/md";
import { useStateProvider } from "../../context/StateContext";
import axios from "axios";
import { ADD_MESSAGE_ROUTE } from "../../utils/ApiRoutes";
import { reducerCases } from "../../context/Constants";

const MessageBar = () => {
  const [{ userInfo, currentChatUser, socket }, dispatch] = useStateProvider();
  const [message, setMessage] = useState("");

  const sendMessage = async () => {
    try {
      // console.log("currentChatuser", currentChatUser.data._id);
      const { data } = await axios.post(ADD_MESSAGE_ROUTE, {
        to: currentChatUser?.data?._id,
        from: userInfo?.id,
        message,
      });
      // console.log("EMITTING");
      socket.current.emit("send-msg", {
        to: currentChatUser?.data?._id,
        from: userInfo?.id,
        message: data.message,
      });
      dispatch({
        type: reducerCases.ADD_MESSAGE,
        newMessage: {
          ...data.message,
        },
      });
      setMessage("");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="bg-panel-header-background h-20 px-4 flex items-center gap-6 relative">
        <>
          <div className="flex gap-6">
            <BsEmojiSmile
              className="text-panel-header-icon cursor-pointer  text-xl"
              title="Emoji"
            ></BsEmojiSmile>
            <ImAttachment
              className="text-panel-header-icon cursor-pointer  text-xl"
              title="Attach File"
            ></ImAttachment>
          </div>
          <div className="w-full rounded-lg h-10 flex items-center">
            <input
              type="text"
              placeholder="Type a message"
              className="bg-input-background text-sm focus:outline-none text-white h-10 rounded-lg px-5 py-4 w-full"
              onChange={(e) => setMessage(e.target.value)}
              value={message}
            ></input>
          </div>
          <div className="flex  w-10 items-center justify-center">
            <button>
              <MdSend
                className="text-panel-header-icon cursor-pointer text-xl"
                title="Send Message"
                onClick={sendMessage}
              />
              {/* <FaMicrophone className="text-panel-header-icon cursor-pointer text-xl " title="Record"/> */}
            </button>
          </div>
        </>
      </div>
    </>
  );
};

export default MessageBar;
