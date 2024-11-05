import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editBlogData } from "@/types/blogType";
import { editBlog } from "@/services/projectSErvice";

export const useUpdateBlog = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (blog: editBlogData) => {
      const data = await editBlog(blog);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });
  return mutation;
};
