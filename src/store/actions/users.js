import { toast } from "react-toastify";
import {
  POPULATE_PROFILE,
  MAKE_REQUEST,
  FAIL_REQUEST,
  GET_USER_LIST,
  DELETE_USER,
  ADD_USER,
  UPDATE_USER,
  GET_USER_OBJ,
} from "../../constants/types/users";

import users from "constants/api/users";

export const populateProfile = (profile = {}) => ({
  type: POPULATE_PROFILE,
  payload: profile,
});

export const makeRequest = () => ({
  type: MAKE_REQUEST,
});

export const failRequest = (error) => ({
  type: FAIL_REQUEST,
  payload: error,
});

export const getUserList = (data) => ({
  type: GET_USER_LIST,
  payload: data,
});

export const deleteUser = () => ({
  type: DELETE_USER,
});

export const addUser = () => {
  return {
    type: ADD_USER,
  };
};
export const updateUser = () => {
  return {
    type: UPDATE_USER,
  };
};
export const getUserObj = (data) => {
  return {
    type: GET_USER_OBJ,
    payload: data,
  };
};

export const FetchUserList = () => {
  return (dispatch) => {
    dispatch(makeRequest());
    users
      .all()
      .then((res) => {
        dispatch(getUserList(res.data));
      })
      .catch((err) => {
        dispatch(failRequest(err.response.data));
      });
  };
};

export const DeleteUser = (id) => {
  return (dispatch) => {
    dispatch(makeRequest());
    users
      .delete(id)
      .then((res) => {
        dispatch(deleteUser(id));
      })
      .catch((err) => {
        dispatch(failRequest(err.response.data));
      });
  };
};

export const FunctionAddUser = (data) => {
  return (dispatch) => {
    dispatch(makeRequest());
    users
      .create(data)
      .then((res) => {
        dispatch(addUser());
        toast.success("tambah user berhasil");
      })
      .catch((err) => {
        dispatch(failRequest(err.response.data));
      });
  };
};


