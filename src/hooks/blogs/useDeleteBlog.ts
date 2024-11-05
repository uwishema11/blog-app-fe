import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBlog } from "@/services/projectSErvice";

export const useDeleteBlog = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (blogId: string) => {
      const data = await deleteBlog(blogId);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });
  return mutation;
};
