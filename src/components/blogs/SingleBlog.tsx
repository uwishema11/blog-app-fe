import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Blog {
  title: string;
  userId: string;
  imageUrl: string;
  content: string;
  comments: string[];
}

interface BlogCardProps {
  blog: Blog;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <img
          src={`https://www.searchenginejournal.com/wp-content/uploads/2020/08/7-ways-a-blog-can-help-your-business-right-now-5f3c06b9eb24e.png`}
          alt={blog.title}
          className="h-64 w-full object-cover"
        />
        <CardTitle className="text-2xl mt-4">{blog.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-lg">{blog.content}</p>
      </CardContent>
      <CardFooter>
        <div className="mt-4">
          <h3 className="text-xl font-semibold">Comments</h3>
          {blog.comments.length > 0 ? (
            <ul>
              {blog.comments.map((comment, index) => (
                <li key={index} className="mt-2">
                  <p>{blog.userId}</p>
                  {comment}
                </li>
              ))}
            </ul>
          ) : (
            <p>No comments yet.</p>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default BlogCard;
