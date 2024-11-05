import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "@/services/userService";


export const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const data = await fetchUsers();
      return data;
    },
  });
};
