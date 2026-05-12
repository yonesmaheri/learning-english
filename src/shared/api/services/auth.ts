import { useMutation } from "@tanstack/react-query";
import { apiCall } from "../apiCall";

const login = async (data: { email: string; password: string }) => {
  const res = await apiCall.post("/login", data);
  return res.data;
};

export const useLogin = () => {
  return useMutation({
    mutationFn: login,
  });
};

const regStudent = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  const res = await apiCall.post("/register/student", data);
  return res.data;
};

export const useRegStudent = () => {
  return useMutation({
    mutationFn: regStudent,
  });
};

const regTutor = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  const res = await apiCall.post("/register/tutor", data);
  return res.data;
};

export const useRegTutor = () => {
  return useMutation({
    mutationFn: regTutor,
  });
};
