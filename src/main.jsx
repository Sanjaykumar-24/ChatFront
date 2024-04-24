import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import ChatPage from "./Pages/ChatPage";
import Login from "./Pages/login";
import Onboarding from "./Pages/onboarding";
import { StateProvider } from "./context/StateContext";
import reducer, { initialState } from "./context/StateReducer";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/onboarding",
    element: <Onboarding />,
  },
  {
    path: "/chat",
    element: <ChatPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <StateProvider initialState={initialState} reducer={reducer}>
    <div id="photo-picker-element"></div>
    <RouterProvider router={router}> </RouterProvider>
  </StateProvider>
);
