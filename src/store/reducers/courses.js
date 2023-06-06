import {
  FETCH_COURSES,
  WATCH_COURSE,
  STATUS_COURSES,
  MESSAGE_COURSE,
  ADD_COURSE, 
  UPDATE_COURSE,
  DELETE_COURSE,
  GET_ALL_COURSES,
  MAKE_REQUEST,
  FAIL_REQUEST,
} from "constants/types/courses";

const initialState = {
  data: {},
  courseList: [],
  total: 0,
  status: "idle",
  message: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case STATUS_COURSES:
      return {
        ...state,
        status: action.payload,
      };

    case FETCH_COURSES:
      return {
        ...state,
        data:
          action.payload?.reduce?.((acc, item) => {
            acc[item.id] = item;
            return acc;
          }, {}) ?? {},
        total: action.payload?.length ?? 0,
        status: "ok",
      };

    case WATCH_COURSE:
      return {
        ...state,
        data: {
          ...state.data,
          [action.payload.id]: {
            ...state.data[action.payload.id],
            ...action.payload,
          },
        },
        status: "ok",
      };

    case MESSAGE_COURSE:
      return {
        ...state,
        message: action.payload,
        status: "error",
      };

      
    case ADD_COURSE:
      return {
        ...state,
        loading: false,
      };

    case UPDATE_COURSE:
      return {
        ...state,
        loading: false,
      };

    case DELETE_COURSE:
      return {
        ...state,
        loading: false,
      };

    case GET_ALL_COURSES:
      return {
        ...state,
        loading: false,
        courseList: action.payload,
      };

    case MAKE_REQUEST:
      return { ...state, loading: true };

    case FAIL_REQUEST:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
}
