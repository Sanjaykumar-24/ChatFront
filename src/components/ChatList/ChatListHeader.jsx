import React from "react";
import Avatar from "../common/Avatar";
import { useStateProvider } from "../../context/StateContext";
import { BsFillChatLeftTextFill, BsThreeDotsVertical } from 'react-icons/bs'
import { reducerCases } from '../../context/Constants'

const ChatListHeader = () => {
    const [{ userInfo }, dispatch] = useStateProvider();
    // console.log("userinfo",userInfo)

    const handleAllContactsPage = () => {
        dispatch({ type: reducerCases.SET_ALL_CONTACTS_PAGE })

    }
    return (
        <>
            <div className="h-16 px-4 py-3 flex justify-between items-center">
                <div className="cursor-pointer">
                    <Avatar type="sm" image={userInfo?.profileImage}></Avatar>                    
                </div>
                <div className="text-cyan-50 ">{userInfo.name}</div>
                
                <div className="flex gap=3">
                    <BsFillChatLeftTextFill className="text-panel-header-icon cursor-pointer text-x1 "
                        title="New Chat"
                        onClick={handleAllContactsPage}></BsFillChatLeftTextFill>
                </div>

                <>
                    <BsThreeDotsVertical className="text-panel-header-icon cursor-pointer text-x1"
                        title="Menu"></BsThreeDotsVertical>
                </>

            </div>
        </>
    )
}
export default ChatListHeader;