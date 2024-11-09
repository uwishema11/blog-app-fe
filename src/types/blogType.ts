export interface blogData {
  id: string;
  title: string;
  content: string;
  image: string;
  userId: string;
  author: {
    firstName: string;
  };
  expireDate?: string;
  createdAt: string;
  updatedAt?: string;
}
export interface createBlogData {
  title: string;
  content: string;
  image?: string;
  author?: string;
}

export interface editBlogData {
  id: string;
  title: string;
  content: string;
  image?: string;
  author: {
    firstName: string;
  };
  expireDate?: string;
  createdAt?: string;
  updatedAt?: string;
}
