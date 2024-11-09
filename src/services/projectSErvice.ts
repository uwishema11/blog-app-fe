import axios from "axios";
import { createBlogData } from "@/types/blogType";
import { editBlogData } from "@/types/blogType";
import "dotenv/config";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export const addBlog = async (data: createBlogData) => {
  const response = await axios.post(`${API_URL}/api/blogs/create`, data);
  if (response.status !== 201) {
    console.log(`here is yr response ${response}`);
    throw new Error(response.data.message);
  }
  return response.data;
};

export const fetchBlogs = async () => {
  const response = await axios.get(`${API_URL}/api/blogs`);
  if (response.status !== 200) {
    throw new Error("Failed to fetch data");
  }
  return response.data;
};
export const fetchSingleBlog = async (blogId: string) => {
  const response = await axios.get(`${API_URL}/api/blogs/${blogId}`);
  if (response.status !== 200) {
    throw new Error("Failed to fetch data");
  }
  return response.data;
};
export const deleteBlog = async (blogId: string) => {
  const response = await axios.delete(`${API_URL}/api/blogs/delete/${blogId}`);
  if (response.status !== 200) {
    throw new Error("Failed to delete a blog");
  }
  return response.data;
};

export const editBlog = async (data: editBlogData) => {
  const response = await axios.patch(
    `${API_URL}/api/blogs/update/${data.id}`,
    data,
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  if (response.status !== 200) {
    throw new Error("Failed to edit blog");
  }
  return response.data;
};
