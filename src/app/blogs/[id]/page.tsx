"use client";

import BlogCard from "@/components/blogs/SingleBlog";
import { useSingleBlog } from "@/hooks/useBlogs";

interface BlogDetailsProps {
  params: {
    id: string;
  };
}

export default function BlogDetails({ params }: BlogDetailsProps) {
  const blogId = params.id;
  const { isLoading, isError, data, error } = useSingleBlog(blogId);

  const blogDetails = data?.result?.data;

  if (isLoading) return <p>Loading ...</p>;
  if (isError) return <p>{error.message}</p>;
  if (!data) return <p>Blog not found</p>;

  return <BlogCard blog={blogDetails} />;
}
