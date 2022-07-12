type Section = {
  title: string;
  content: string
}

type Author = {
  username: string;
  firstName: string;
  lastName: string;
  _id: string;
  description: string;
}
export type Comment = {
  blog: string;
  author: Author;
  createdAt: string;
  _id: string;
  text: string;
  isAnonymous: boolean;
}
export interface BlogType {
  _id: string;
  title: string;
  tags: string[];
  author: Author;
  sections: Section[];
  createdAt: string;
  updatedAt: string;
  intro: Section;
  comments: Comment[]
}

export interface MyResponseType<T> {
  data: {
    data: T
  }
}


export interface LoginResponse {
  data: {
    access_token: string;
    user: User
  }
}

interface User {
  createdAt: string;
  updatedAt: string;
  firstName: string;
  lastName: string;
  username: string;
  displayPic: string;
  _id: string;
  email: string;
  description: string;
}