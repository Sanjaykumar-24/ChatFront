import axios from "axios";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Navigate } from "react-router-dom";
import { reducerCases } from "../context/Constants";
import { useStateProvider } from "../context/StateContext";
import { CHECK_USER_ROUTE } from "../utils/ApiRoutes";
import { firebaseAuth } from "../utils/FireBase";

function Login() {
  const [{ userInfo, newUser }, dispatch] = useStateProvider();
  const [route, setRoute] = useState(false);
  const [chatRoute, setChatRoute] = useState(false);

  useEffect(() => {}, [userInfo, newUser]);

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();

    const {
      user: { displayName: name, email, photoURL: profileImage },
    } = await signInWithPopup(firebaseAuth, provider);

    const id = "";
    try {
      if (email) {
        // !DATABASE EXISTS Backend Check
        const { data } = await axios.post(CHECK_USER_ROUTE, { email });
        // ! CONSOLE

        if (!data.status) {
          dispatch({
            type: reducerCases.SET_NEW_USER,
            newUser: true,
          });

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
          //! It Just totall refreshes the page and data are lost
          setRoute(true);
        } else {
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
        }
      }
    } catch (err) {
      alert("error Login");
    }
  };

  return (
    <>
      {chatRoute && <Navigate to="/"></Navigate>}
      {route && <Navigate to="/onboarding"></Navigate>}

      <div className="flex justify-center items-center bg-panel-header-background h-screen w-screen flex-col gap-6">
        <div className="flex items-center justify-center gap-2 text-white">
          <img
            src="/byte_chat.png"
            alt="ByteChatLogo"
            height={300}
            width={300}
          ></img>
          <span className="text-7xl">Byte Chat</span>
        </div>
        <button
          className="flex items-center gap-7 bg-search-input-container-background p-5 rounded-lg"
          onClick={handleLogin}
        >
          <FcGoogle className="text-4xl" />
          <span className="text-white text-2xl">Login with Google</span>
        </button>
      </div>
    </>
  );
}
export default Login;
