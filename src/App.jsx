import React, { useEffect } from "react";
import { createBrowserHistory } from "history";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "../src/assets/css/style.css";
import "react-toastify/dist/ReactToastify.css"

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
import DashboardAdmin from "pages/DashboardAdmin";
import ManagedCourse from "pages/ManagedCourse";
import ManagedUser from "pages/ManagedUser";
import ManagedTransaction from "pages/ManagedTransaction";
import SettingAdmin from "pages/SettingAdmin";
import AddUser from "parts/Users/AddUser";
import { ToastContainer } from "react-toastify";

import  setAuthorizationHeader  from "./configs/axios/setAuthorizationHeader";


import users from "./constants/api/users";

import { populateProfile } from "./store/actions/users";
import AddCourse from "parts/Course/AddCourse";
import Submission from "pages/Submission";

function App() {
  const dispatch = useDispatch();
  const history = createBrowserHistory({ basename: process.env.PUBLIC_URL });

  const [role, setRole] = React.useState(null);

  const USERS = useSelector((state) => state.users);

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

  useEffect(() => {
    if (USERS?.role === "admin") {
      setRole("admin");
    } else if (USERS?.role === "student") {
      setRole("student");
    } else {
      setRole(null);
    }
  }, [USERS]);
  
  
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
              {role === "admin" ? ( <DashboardAdmin />) : (<MyClass />)}
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
          path="/settings-admin"
          element={
            <MemberRoute>
              <SettingAdmin />
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

        <Route
        index
          path="/managed-courses"
          element={
            <MemberRoute>
              <ManagedCourse />
            </MemberRoute>
          }
        />
        <Route
        index
          path="/managed-users"
          element={
            <MemberRoute>
              <ManagedUser />
            </MemberRoute>
          }
        />
        <Route
        index
          path="/managed-transactions"
          element={
            <MemberRoute>
              <ManagedTransaction />
            </MemberRoute>
          }
        />
        <Route
        index
          path="/add-user"
          element={
            <MemberRoute>
              <AddUser />
            </MemberRoute>
          }
        />
        <Route
        index
          path="/add-course"
          element={
            <MemberRoute>
              <AddCourse />
            </MemberRoute>
          }
        />
        <Route
        index
          path="/submission"
          element={
            <MemberRoute>
              <Submission />
            </MemberRoute>
          }
        />
       
        <Route path="*" element={NotFound} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
