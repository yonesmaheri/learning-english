import { useMutation, useQuery } from "@tanstack/react-query";
import { apiCall } from "../apiCall";

const updateStudent = async (data: any) => {
  const res = await apiCall.patch("/students/me/profile/", data);
  return res.data;
};

export const useUpdateStudent = () => {
  return useMutation({
    mutationFn: updateStudent,
  });
};



const studentDashboard = async () => {
  const res = await apiCall.get("/students/me/dashboard/");
  return res.data;
};
export const useStudentDashboard = () => {
  return useQuery({
    queryKey: ["student/dashboard"],
    queryFn: studentDashboard,
  });
};
