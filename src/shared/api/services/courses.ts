import { useMutation, useQuery } from "@tanstack/react-query";
import { apiCall } from "../apiCall";

const courses = async () => {
  const res = await apiCall.get("/courses/");
  return res.data;
};
export const useCourses = () => {
  return useQuery({
    queryKey: ["courses"],
    queryFn: courses,
  });
};

const tutorCourses = async () => {
  const res = await apiCall.get(`/tutor-courses/`);
  return res.data;
};

export const useTutorCourses = () => {
  return useQuery({
    queryKey: ["tutor-courses"],
    queryFn: () => tutorCourses(),
  });
};

const enroll = async (data: any) => {
  const res = await apiCall.post("/enrollments/", data);
  return res.data;
};

export const useEnroll = () => {
  return useMutation({
    mutationFn: enroll,
  });
};

const createCourse = async (data: any) => {
  const res = await apiCall.post("/courses/", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const useCreateCourse = () => {
  return useMutation({
    mutationFn: createCourse,
  });
};
