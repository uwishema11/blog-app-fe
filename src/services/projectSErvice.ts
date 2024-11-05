import axios from "axios";
import { createBlogData } from "@/types/blogType";
import { editBlogData } from "@/types/blogType";

export const addBlog = async (data: createBlogData) => {
  const response = await axios.post(
    "http://localhost:4000/api/blogs/create",
    data
  );
  if (response.status !== 201) {
    console.log(response.data.message);
    throw new Error(response.data.message);
  }
  console.log(response.data);
  return response.data;
};


// export const fetchBlogs = async () => {
//   try {
//     const response = await fetch("http://localhost:3000/api/blogs");

//     // Check if the response is OK
//     if (!response.ok) {
//       throw new Error(`Server error: ${response.status}`);
//     }

//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.log(error)
//     // Throw an error if there’s a network or server issue
//     throw new Error("Could not connect to the server. Please try again later.");
//   }
// };


export const fetchBlogs = async () => {
  const response = await axios.get("http://localhost:4000/api/blogs");
  if (response.status !== 200) {
    throw new Error("Failed to fetch data");
  }
  return response.data;
};
export const fetchSingleBlog = async (blogId: string) => {
  const response = await axios.get(`http://localhost:4000/api/blogs/${blogId}`);
  if (response.status !== 200) {
    throw new Error("Failed to fetch data");
  }
  return response.data;
};
export const deleteBlog = async (blogId: string) => {
  console.log(blogId);
  const response = await axios.delete(
    `http://localhost:4000/api/blogs/delete/${blogId}`
  );
  if (response.status !== 200) {
    throw new Error("Failed to delete a blog");
  }
  return response.data;
};

export const editBlog = async (data: editBlogData) => {
  const response = await axios.patch(
    `http://localhost:4000/api/blogs/update/${data.id}`,
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
