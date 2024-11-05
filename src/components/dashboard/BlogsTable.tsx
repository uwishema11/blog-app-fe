"use client";
import { useState } from "react";
import * as z from "zod";
import { blogData, editBlogData } from "@/types/blogType";
import { useDeleteBlog } from "@/hooks/blogs/useDeleteBlog";
// import Image from "next/image";
import { useBlogs } from "@/hooks/useBlogs";
import {
  File,
  ListFilter,
  MoreHorizontal,
  PlusCircle,
  Search,
} from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
// import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUpdateBlog } from "@/hooks/blogs/useUpdateBlog";
import { useCreateBlog } from "@/hooks/blogs/useCreate";
import ReusableTable from "../Table";

export const description =
  "An products dashboard with a sidebar navigation. The sidebar has icon navigation. The content area has a breadcrumb and search in the header. It displays a list of products in a table with actions.";

const blogSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  content: z.string().min(10, "Content must be at least 10 characters"),
});

function BlogsTable() {
  const { isLoading, isError, data, error } = useBlogs();
  const [isSheetOpen, setSheetOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<editBlogData | null>(null);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const list = data?.result.data;

  const deleteMutation = useDeleteBlog();
  const editMutation = useUpdateBlog();
  const createBlogMutation = useCreateBlog();

  function handleDeleteBlog(id: string) {
    if (deleteMutation.isError) {
      console.log(error);
    }
    if (deleteMutation.isPending) {
      console.log("deleting");
    }
    deleteMutation.mutate(id, {
      onSuccess: () => {
        console.log("deleted");
      },
      onError: (error) => {
        console.log(error);
      },
    });
  }

  function openSheetForEdit(blog: editBlogData) {
    setSelectedBlog(blog);
    setIsEditMode(true);
    setTitle(blog.title);
    setAuthor(blog.author.firstName);
    setContent(blog.content);
    setSheetOpen(true);
  }

  function openSheetForNew() {
    setSelectedBlog(null);
    setIsEditMode(false);
    setTitle("");
    setAuthor("");
    setContent("");
    setSheetOpen(true);
  }

  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

  
    const validation = blogSchema.safeParse({ title, content })
    if (!validation.success) {
      const errors = validation.error.flatten().fieldErrors;
      setFormErrors({
        title: errors.title ? errors.title[0] : "",
        content: errors.content ? errors.content[0] : "",
      });
      return;
    }

    const blogDatas = { title, content };

    if (isEditMode && selectedBlog) {
      editMutation.mutate(
        { ...selectedBlog, ...blogDatas },
        {
          onSuccess: () => console.log("Blog updated"),
          onError: (error) => console.log(error),
        }
      );
    } else {
      console.log(blogDatas);
      createBlogMutation.mutate(blogDatas, {
        onSuccess: () => console.log("Blog created"),
        onError: (error) => console.log(error),
      });
    }
    setSheetOpen(false);
  }

  if (isLoading) return <span>Loading...</span>;
  if (isError) return <span>Error: {error.message}</span>;

  const columns: ColumnDef<blogData>[] = [
    {
      accessorKey: "title",
      header: "Title",
    },
    {
      header: "Author",
      cell: ({ row }) => `${row.original.author.firstName}`,
    },
    {
      accessorKey: "createdAt",
      header: "Date Published",
    },
    {
      header: "Actions",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="ghost">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => openSheetForEdit(row.original)}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDeleteBlog(row.original.id)}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-3 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <div className="relative ml-auto flex-1 md:grow-0">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
            />
          </div>
          <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button
                onClick={openSheetForNew}
                className="flex items-center gap-1"
              >
                <PlusCircle className="h-5 w-5" />
                Add Blog
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>
                  {isEditMode ? "Edit Blog" : "Add New Blog"}
                </SheetTitle>
              </SheetHeader>
              <form onSubmit={handleFormSubmit} className="flex flex-col gap-2">
                <Input
                  name="title"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                {formErrors.title && (
                  <span className="text-red-500">{formErrors.title}</span>
                )}
                <Input
                  name="author"
                  placeholder="Author"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                />
                {formErrors.author && (
                  <span className="text-red-500">{formErrors.author}</span>
                )}
                <Textarea
                  name="content"
                  placeholder="Content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
                {formErrors.content && (
                  <span className="text-red-500">{formErrors.content}</span>
                )}
                <Button type="submit">
                  {isEditMode ? "Update Blog" : "Create Blog"}
                </Button>
              </form>
            </SheetContent>
          </Sheet>
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Tabs defaultValue="all">
            <div className="flex items-center">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="draft">Draft</TabsTrigger>
                <TabsTrigger value="archived" className="hidden sm:flex">
                  Archived
                </TabsTrigger>
              </TabsList>
              <div className="ml-auto flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-8 gap-1">
                      <ListFilter className="h-3.5 w-3.5" />
                      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Filter
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem checked>
                      Active
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>
                      Archived
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button size="sm" variant="outline" className="h-8 gap-1">
                  <File className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Export
                  </span>
                </Button>
              </div>
            </div>
            <TabsContent value="all">
              <Card>
                <CardHeader>
                  <CardTitle>Blogs</CardTitle>
                  <CardDescription>
                    Manage your blogs and view their details.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ReusableTable data={list} columns={columns} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}

export default BlogsTable;
