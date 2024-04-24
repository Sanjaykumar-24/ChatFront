import React from "react";

const Empty = () => {
    return (
        <>
            <div className="border-conversation-border border-l w-full bg-panel-header-background flex flex-col h-[100vh] border-b-4 border-b-icon-green items-center justify-center">
                <img src="/byte_chat.png" alt="ByteChatLogo" height={300} width={300}></img>
            </div>
        </>
    )
}

export default Empty;