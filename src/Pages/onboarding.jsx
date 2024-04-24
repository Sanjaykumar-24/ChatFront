import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Avatar from "../components/common/Avatar";
import Input from "../components/common/Input";
import { reducerCases } from "../context/Constants";
import { useStateProvider } from "../context/StateContext";
import { ONBOARD_USER_ROUTE } from "../utils/ApiRoutes";

function Onboarding() {
  const [{ userInfo, newUser }, dispatch] = useStateProvider();
  const [name, setName] = useState(userInfo?.name);
  const [image, setImage] = useState(userInfo?.profileImage);
  const [loginRoute, setLoginRoute] = useState(false);
  const [chatRoute, setChatRoute] = useState(false);

  useEffect(() => {
    if (!newUser && !userInfo?.email) {
      setLoginRoute(true);
    } else if (!newUser && userInfo?.email) {
      setChatRoute(true);
    }
  }, [newUser, userInfo]);

  const onboardUserHandler = async () => {
    if (validateDetails) {
      const email = userInfo.email;
      try {
        const { data } = await axios.post(ONBOARD_USER_ROUTE, {
          email,
          name,
          image,
        });

        if (data.status) {
          dispatch({
            type: reducerCases.SET_NEW_USER,
            newUser: false,
          });
          
          dispatch({
              type: reducerCases.SET_USER_INFO,
              userInfo: {
                  name,
                  email,
                  profileImage: image,
                  status: "",
                },
            });
            // ! Route to Char Page
            setImage(userInfo.profileImage)
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  console.log("Image",image)
  

  const validateDetails = () => {
    if (name.length < 3) {
      return false;
    }
    return true;
  };
  return (
    <>
      {loginRoute && <Navigate to="/login"></Navigate>}
      {chatRoute && <Navigate to="/"></Navigate>}

      <div className="bg-panel-header-background h-screen w-screen text-white flex flex-col items-center justify-center">
        <div className="flex items-center justify-center gap-2">
          <img src="byte_char.png" alt="ByteChatLogo" height={300} width={300}></img>
          <span className="text-7xl">Byte Chat</span>
        </div>
        <h2 className="text-2xl">Create your profile</h2>
        <div className="flex gap-6 mt-6">
          <div className="flex flex-col items-center justify-center mt-5 gap-6">

            <Input name={name} setName={setName}></Input>

            <div className="flex items-center justify-center">
              <button
                className="flex items-center gap-7 bg-search-input-container-background p-5 rounded-lg"
                onClick={onboardUserHandler}
              >
                Create Profile
              </button>
            </div>
          </div>
          <div>
            <Avatar type="xl" image={image} setImage={setImage}></Avatar>
          </div>
        </div>
      </div>
    </>
  );
}
export default Onboarding;
