import { useMutation, useQuery } from "@tanstack/react-query";
import { apiCall } from "../apiCall";

const login = async (data: any) => {
  const res = await apiCall.post("/login/", data);
  return res.data;
};

export const useLogin = () => {
  return useMutation({
    mutationFn: login,
  });
};

const register = async (data: any) => {
  const res = await apiCall.post("/register/", data);
  return res.data;
};

export const useRegister = () => {
  return useMutation({
    mutationFn: register,
  });
};

const me = async () => {
  const res = await apiCall.get("/me/");
  return res.data;
};
export const useMe = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: me,
  });
};
