import axios from "configs/axios";
export default {
  all: (options = { params: {} }) => axios.get(`/orders`, options),
  getAll: (options = { params: {} }) => axios.get(`/orders/all`, options),
};
