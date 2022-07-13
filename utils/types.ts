type Section = {
  title: string;
  content: string
}

// type Author = {
//   username: string;
//   firstName: string;
//   lastName: string;
//   _id: string;
//   about: string;
//   picture: string;
// }
export type Comment = {
  blog: string;
  author: User;
  createdAt: string;
  _id: string;
  text: string;
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
  comments: Comment[]
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
}