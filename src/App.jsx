import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import ChatPage from "./Pages/ChatPage";
import Login from "./Pages/login";
import { reducerCases } from "./context/Constants";
import { useStateProvider } from "./context/StateContext";
import "./index.css";
import { CHECK_USER_ROUTE } from "./utils/ApiRoutes";
import { firebaseAuth } from "./utils/FireBase";

function App() {
  const [loginRoute, setLoginRoute] = useState(false);
  const [chatRoute, setChatRoute] = useState(false);
  const [{ userInfo, currentChatUser }, dispatch] = useStateProvider();

  useEffect(()=>{
    if(userInfo){
      setChatRoute(true)
    }
  })

  if (!userInfo) {
    onAuthStateChanged(firebaseAuth, async (currentUser) => {
      if (currentUser) {
        const { data } = await axios.post(CHECK_USER_ROUTE, {
          email: currentUser.email,
        });
        if (data.status) {
          const {
            user_name: name,
            email,
            profilePicture: profileImage,
            _id: id,
          } = data.data;
          dispatch({
            type: reducerCases.SET_USER_INFO,
            userInfo: {
              id,
              name,
              email,
              profileImage,
              status: "",
            },
          });
          setChatRoute(true);
        } else {
          setLoginRoute(true);
        }
      } else {
        setLoginRoute(true);
      }
    });
  }

  return (
    <>
      {chatRoute && <ChatPage></ChatPage>}
      {loginRoute && <Login></Login>}
      {loginRoute && <div></div>}
    </>
  );
}

export default App;
