import { combineReducers } from "@reduxjs/toolkit";

import users from "./users";
import courses from "./courses";
import orders from "./orders";

const rootReducer = combineReducers({
  users,
  courses,
  orders,
});

export default rootReducer;
