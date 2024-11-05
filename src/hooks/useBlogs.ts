import { useQuery } from "@tanstack/react-query";

import { fetchBlogs, fetchSingleBlog } from "@/services/projectSErvice";

export const useBlogs = () => {
  return useQuery({
    queryKey: ["blogs"],
    queryFn: async()=>{
        const data = await fetchBlogs()
        return  data
    }
  });
};

export const useSingleBlog = (id: string) => {
  return useQuery({
    queryKey: ["blogId"],
    queryFn: async()=>{
        const data = await fetchSingleBlog(id);
        return  data
    }
  });
};

