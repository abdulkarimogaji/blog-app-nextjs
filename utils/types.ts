type Section = {
  title: string;
  content: string;
  image: string;
};

export type Comment = {
  blog: string;
  author: User;
  createdAt: Date;
  _id: string;
  text: string;
  like_count: number;
  isAnonymous: boolean;
};
export interface BlogType {
  _id: string;
  title: string;
  tags: string[];
  author: User;
  sections: Section[];
  createdAt: Date;
  updatedAt: Date;
  intro: Section;
  comments: Comment[];
  like_count: number;
  view_count: number;
  slug: string;
}

export interface MyResponseType<T> {
  data: {
    data: T;
  };
}

export type LoginResponse = {
  user: User;
  access_token: string;
};

export interface User {
  createdAt: Date;
  updatedAt: Date;
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

export type FetchBlogParams = {
  page: number;
  sort: "relevant" | "recent" | "viewed";
  limit: number;
  searchKey: string | undefined;
};
