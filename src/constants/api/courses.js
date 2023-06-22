import axios from "configs/axios";
export default {
  details: (id) => axios.get(`/courses/${id}`).then((res) => res.data),

  join: (id) => axios.post("/my-courses", { course_id: id }),
  mine: () => axios.get("/my-courses"),
  all: () => axios.get("/courses").then((res) => res.data),
  create: (data) => axios.post("/courses", data),
  update: (id, data) => axios.put(`/courses/${id}`, data),
  delete: (id) => axios.delete(`/courses/${id}`),

};
