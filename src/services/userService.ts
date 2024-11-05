
import axios from "axios";

export const fetchUsers = async () => {
  const response = await axios.get("http://localhost:4000/api/users");
  if (response.status !== 200) {
    throw new Error("Failed to fetch data");
  }
  return response.data;
};