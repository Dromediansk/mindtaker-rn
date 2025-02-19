interface User {
  id: string;
  name: string;
  fullName: string;
  email: string;
  avatarUrl?: string;
}

interface Category {
  id: string;
  name: string;
}

interface Idea {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  modifiedAt: string;
  user: User;
  category: Category;
}
