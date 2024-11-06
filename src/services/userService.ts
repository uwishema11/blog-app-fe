
import axios from "axios";

export const fetchUsers = async () => {
  const response = await axios.get(`${process.env.API_URL}/api/users`);
  if (response.status !== 200) {
    throw new Error("Failed to fetch data");
  }
  return response.data;
};