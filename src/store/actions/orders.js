import {
  FETCH_ORDERS,
  STATUS_ORDERS,
  MESSAGE_ORDER,
  MAKE_REQUEST,
  FAIL_REQUEST,
  GET_ORDER_LIST
} from "constants/types/orders";

import orders from "constants/api/orders";

export const statusOrders = (status) => ({
  type: STATUS_ORDERS,
  payload: status,
});

export const fetchOrders = (orders) => ({
  type: FETCH_ORDERS,
  payload: orders,
});

export const messageOrder = (message) => ({
  type: MESSAGE_ORDER,
  payload: message,
});

export const makeRequest = () => ({
  type: MAKE_REQUEST,
});

export const failRequest = (error) => ({
  type: FAIL_REQUEST,
  payload: error,
});

export const getOrderList = (orders) => ({
  type: GET_ORDER_LIST,
  payload: orders,
});

export const fetchOrderList = () => {
  return async (dispatch) => {
    dispatch(makeRequest());
    try {
      const response = await orders.getAll();
      dispatch(getOrderList(response.data));
    } catch (error) {
      dispatch(failRequest(error.message));
    }
  };
}
