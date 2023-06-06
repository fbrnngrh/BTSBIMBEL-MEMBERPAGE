import {
  POPULATE_PROFILE,
  MAKE_REQUEST,
  FAIL_REQUEST,
  GET_USER_LIST,
  DELETE_USER,
  ADD_USER,
  UPDATE_USER,
  GET_USER_OBJ
} from "../../constants/types/users";

const initialState = {
  loading: true,
  userlist: [],
  userobj: {},
  error: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case POPULATE_PROFILE:
      return action.payload;
    case MAKE_REQUEST:
      return { ...state, loading: true };
    case FAIL_REQUEST:
      return { ...state, loading: false, error: action.payload };
    case GET_USER_LIST:
      return {
        ...state,
        loading: false,
        userlist: action.payload,
        error: "",
        userobj: {},
      };
    case DELETE_USER:
      return {
        ...state,
        loading: false,
      };
      case ADD_USER:return{
        ...state,
        loading:false
    }
    case UPDATE_USER:return{
        ...state,
        loading:false
    }
    case GET_USER_OBJ:return{
        ...state,
        loading:false,
        userobj:action.payload
    }

    default:
      return state;
  }
}
