import React from "react";
import ChatListHeader from "./ChatList/ChatListHeader";
import ChatHeader from "./Chat/ChatHeader";
import ChatContainer from "./Chat/ChatContainer"
import MessageBar from "./Chat/MessageBar";

const Chat=()=>{
    return (
        <>
        <div className="border-conversation-border border -1 w-full bg-conversation-panel-background flex flex-col h-[100vh] z-10">
            <ChatHeader></ChatHeader>
            <ChatContainer></ChatContainer>
            <MessageBar></MessageBar>
        </div>
        </>
    )
}
export default Chat;