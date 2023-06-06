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

import courses from "constants/api/courses";

export const statusCourses = (status) => ({
  type: STATUS_COURSES,
  payload: status,
});

export const fetchCourses = (courses) => ({
  type: FETCH_COURSES,
  payload: courses,
});

export const watchCourse = (course) => ({
  type: WATCH_COURSE,
  payload: course,
});

export const messageCourse = (message) => ({
  type: MESSAGE_COURSE,
  payload: message,
});

export const addCourse = (course) => ({
  type: ADD_COURSE,
  payload: course,
});

export const updateCourse = (course) => ({
  type: UPDATE_COURSE,
  payload: course,
});

export const deleteCourse = (course) => ({
  type: DELETE_COURSE,
  payload: course,
});

export const getAllCourses = (courses) => ({
  type: GET_ALL_COURSES,
  payload: courses,
});

export const makeRequest = () => ({
  type: MAKE_REQUEST,
});

export const failRequest = (error) => ({
  type: FAIL_REQUEST,
  payload: error,
});

export const fetchCoursesAsync = () => async (dispatch) => {
  dispatch(makeRequest());
  try {
    const res = await courses.all();
    dispatch(fetchCourses(res.data));
  } catch (error) {
    dispatch(failRequest(error));
  }
};

export const addCourseAsync = (course) => async (dispatch) => {
  dispatch(makeRequest());
  try {
    const res = await courses.add(course);
    dispatch(addCourse(res.data));
  } catch (error) {
    dispatch(failRequest(error));
  }
}

export const deleteCourseAsync = (course) => async (dispatch) => {
  dispatch(makeRequest());
  try {
    const res = await courses.delete(course);
    dispatch(deleteCourse(res.data));
  } catch (error) {
    dispatch(failRequest(error));
  }
}
