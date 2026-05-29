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

const blog = async (id: number) => {
  const res = await apiCall.get(`/blogs/${id}`);
  return res.data;
};

export const useBlog = (id: number) => {
  return useQuery({
    queryKey: ["blog", id],
    queryFn: () => blog(id),
  });
};