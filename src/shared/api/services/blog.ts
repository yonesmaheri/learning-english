import { useQuery } from "@tanstack/react-query";
import { apiCall } from "../apiCall";

const blogs = async () => {
  const res = await apiCall.get("/blogs/");
  return res.data;
};
export const useBlogs = () => {
  return useQuery({
    queryKey: ["blogs"],
    queryFn: blogs,
  });
};
