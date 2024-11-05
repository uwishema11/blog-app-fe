import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBlogData } from "@/types/blogType";
import { addBlog } from "@/services/projectSErvice";

export const useCreateBlog = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (blog: createBlogData) => {
      const data = await addBlog(blog);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });
  return mutation;
};
