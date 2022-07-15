type Section = {
  title: string;
  content: string;
  image: string;
}

export type Comment = {
  blog: string;
  author: User;
  createdAt: string;
  _id: string;
  text: string;
  like_count: number;
  isAnonymous: boolean;
}
export interface BlogType {
  _id: string;
  title: string;
  tags: string[];
  author: User;
  sections: Section[];
  createdAt: string;
  updatedAt: string;
  intro: Section;
  comments: Comment[];
  like_count: number;
  view_count: number;
}

export interface MyResponseType<T> {
  data: {
    data: T,
  }
}


export type LoginResponse = {
  user: User;
  access_token: string;
}

export interface User {
  createdAt: string;
  updatedAt: string;
  firstName: string;
  lastName: string;
  username: string;
  picture: string;
  _id: string;
  email: string;
  about: string;
  blogCount: number;
  comments: Comment[];
}