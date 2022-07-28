import { useRouter } from "next/router";
import { useState } from "react";
import { useQuery } from "react-query";

import BlogList from "../../components/BlogList";
import Spinner from "../../components/Spinner";
import { request } from "../../utils/axios-utils";
import { BlogType, MyResponseType } from "../../utils/types";

const fetchBlogs = (page: number, searchKey: string) => {
  return request({
    url: `/blogs/search?searchKey=${searchKey}&page=${page}&limit=10`,
  });
};

const Home = () => {
  // for pagination
  const [page, setPage] = useState(1);
  const searchKey = useRouter().query.searchKey as string;

  const { isError, isSuccess, isLoading, data, error } = useQuery<
    MyResponseType<BlogType[]>,
    any
  >(["blogs", searchKey, page], () => fetchBlogs(page, searchKey as string), {
    keepPreviousData: true,
  });

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
    return <BlogList blogs={blogs} tags={tags} searchKey={searchKey} />;
  }
};

export default Home;
