import {
  FETCH_ORDERS,
  STATUS_ORDERS,
  MESSAGE_ORDER,
 MAKE_REQUEST,
  FAIL_REQUEST,
  GET_ORDER_LIST,
} from "constants/types/orders";

const initialState = {
  data: {},
  total: 0,
  status: "idle",
  message: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case STATUS_ORDERS:
      return {
        ...state,
        status: action.payload,
      };

    case FETCH_ORDERS:
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

    case MESSAGE_ORDER:
      return {
        ...state,
        message: action.payload,
        status: "error",
      };

    case MAKE_REQUEST:
      return {
        ...state,
        status: "loading",
      };

    case FAIL_REQUEST:
      return {
        ...state,
        status: "error",
        message: action.payload,
      };

    case GET_ORDER_LIST:
      return {
        ...state,
        status: "ok",
        data: action.payload,
      };
      

    default:
      return state;
  }
}
