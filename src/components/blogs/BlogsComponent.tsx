"use client";
import Image from "next/image";
import { useBlogs } from "@/hooks/useBlogs";
import Link from "next/link";
import { blogData } from "@/types/blogType";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function BlogsComponent() {
  const { isLoading, isError, data, error } = useBlogs();

  if (isLoading) {
    return <span>Loading...</span>;
  }
  if (isError) {
    console.log(`this is fecthng error${error.message}`)
    return <span>Error: {error.message}</span>;
  }

 
  const list = data?.result?.data;

  if (!list) {
    return <span>No data available</span>;
  }
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {list.map((blog: blogData) => (
          <Card key={blog.id} className="w-full">
            <CardHeader>
              <Image
                src={`https://searchenginejournal.com/wp-content/uploads/2020/08/7-ways-a-blog-can-help-your-business-right-now-5f3c06b9eb24e.png`}
                alt={blog.title}
                width={300}
                height={300}
                className="h-48 w-full object-cover"
              />
            </CardHeader>
            <CardContent>
              <CardTitle>{blog.title}</CardTitle>
            </CardContent>
            <CardFooter>
              <Link href={`/blogs/${blog.id}`}>
                <Button>Read More</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}

export default BlogsComponent;
