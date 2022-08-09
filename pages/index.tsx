import { useState } from "react";
import { useQuery } from "react-query";

import Spinner from "../components/Spinner";
import { request } from "../utils/axios-utils";
import { BlogType, MyResponseType, FetchBlogParams } from "../utils/types";
import BlogList from "../components/BlogList";

const fetchBlogs = (params: FetchBlogParams) => {
  return request({ url: `/blogs`, params });
};

const Home = () => {
  const [queryParam, setQueryParam] = useState<FetchBlogParams>({
    limit: 10,
    page: 1,
    sort: "relevant",
  } as FetchBlogParams);
  const { isError, isSuccess, isLoading, data, error } = useQuery<
    MyResponseType<BlogType[]>,
    any
  >(
    ["blogs", "", queryParam.sort, queryParam.page],
    () => fetchBlogs(queryParam),
    { keepPreviousData: true }
  );
  if (isError) {
    return <div>{error.message}</div>;
  }

  if (isLoading) return <Spinner />;

  if (isSuccess) {
    const tags = new Set<string>();
    data.data.data.forEach((blog) => {
      for (let i = 0; i < blog.tags.length; i++) {
        const tag = blog.tags[i];
        tags.add(tag);
      }
    });
    const blogs = data?.data.data;

    return <BlogList blogs={blogs} tags={tags} />;
  }
};

export default Home;
