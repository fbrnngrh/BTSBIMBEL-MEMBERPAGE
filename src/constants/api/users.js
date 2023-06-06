import axios from "../../configs/axios";

export default {
  login: (credentials) => axios.post("/users/login", credentials),

  register: (payload) => axios.post("/users/register", payload),
  refresh: (credentials) =>
    axios.post("/refresh-tokens", {
      refresh_token: credentials.refresh_token,
      email: credentials.email,
    }),
  
  all: () => axios.get("/users/all"),
  details: () => axios.get("/users"),
  update: (data) => axios.put("/users", data),
  logout: () => axios.post("/users/logout"),
  delete: (id) => axios.delete(`/users/${id}`),
  create: (data) => axios.post("/users", data),

};
