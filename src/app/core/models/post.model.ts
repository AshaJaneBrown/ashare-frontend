export interface Post {
  id: number;
  title: string;
  content: string;
  author: {
    username: string;
    email: string;
  };
  createdAt: string;
}
