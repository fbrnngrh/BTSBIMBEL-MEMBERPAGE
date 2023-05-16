import React, { useEffect } from "react";
import { createBrowserHistory } from "history";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import "../src/assets/css/style.css";

import MemberRoute from "./components/Routes/MemberRoute";
import GuestRoute from "./components/Routes/GuestRoute";

import NotFound from "./pages/404";
import Unauthenticated from "./pages/401";

import Login from "./pages/Login";
import Register from "./pages/Register";

import MyClass from "./pages/MyClass";
import Joined from "./pages/Joined";
import DetailsClass from "./pages/DetailsClass";
import Settings from "./pages/Settings";
import Transactions from "./pages/Transactions";

import  setAuthorizationHeader  from "./configs/axios/setAuthorizationHeader";

import users from "./constants/api/users";

import { populateProfile } from "./store/actions/users";

function App() {
  const dispatch = useDispatch();
  const history = createBrowserHistory({ basename: process.env.PUBLIC_URL });

  useEffect(() => {
    let session = null;
    if (localStorage.getItem("BTSBIMBEL:token")) {
      session = JSON.parse(localStorage.getItem("BTSBIMBEL:token"));
      setAuthorizationHeader(session.token);

      users.details().then((details) => {
        dispatch(populateProfile(details.data));
      });
    }
  }, [dispatch]);
  return (
    <>
      <Routes history={history}>
        <Route
          path="/login"
          element={
            <GuestRoute>
              <Login />
            </GuestRoute>
          }
        />
        <Route
          path="/register"
          element={
            <GuestRoute>
              <Register />
            </GuestRoute>
          }
        />
        <Route
          path="/private"
          element={
            <GuestRoute>
              <Unauthenticated />
            </GuestRoute>
          }
        />

        <Route
        index
          path="/"
          element={
            <MemberRoute>
              <MyClass />
            </MemberRoute>
          }
        />
        <Route
        index
          path="/joined/:class"
          element={
            <MemberRoute>
              <Joined />
            </MemberRoute>
          }
        />
        <Route
        index
          path="/courses/:class/:chapter/:uid"
          element={
            <MemberRoute>
              <DetailsClass />
            </MemberRoute>
          }
        />
        <Route
        index
          path="/courses/:class/"
          element={
            <MemberRoute>
              <DetailsClass />
            </MemberRoute>
          }
        />
        <Route
        index
          path="/settings"
          element={
            <MemberRoute>
              <Settings />
            </MemberRoute>
          }
        />
        <Route
        index
          path="/transactions"
          element={
            <MemberRoute>
              <Transactions />
            </MemberRoute>
          }
        />

       
        <Route path="*" element={NotFound} />
      </Routes>
    </>
  );
}

export default App;
