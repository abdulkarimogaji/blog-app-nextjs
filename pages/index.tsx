import { useState } from "react";
import { useQuery } from "react-query";

import Spinner from "../components/Spinner";
import { request } from "../utils/axios-utils";
import { BlogType, MyResponseType } from "../utils/types";
import BlogList from "../components/BlogList";
import Script from "next/script";
import { analyse } from "../utils/analytics";

const fetchBlogs = (page: number) => {
  return request({ url: `/blogs?page=${page}&limit=10` });
};

const Home = () => {
  const [page, setPage] = useState(1);
  const { isError, isSuccess, isLoading, data, error } = useQuery<
    MyResponseType<BlogType[]>,
    any
  >(["blogs", page], () => fetchBlogs(page), { keepPreviousData: true });
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

    return (
      <>
        <Script id="home-script">
          {document.addEventListener("scroll", () => analyse("home-scroll"), {
            once: true,
          })}
        </Script>
        <BlogList blogs={blogs} tags={tags} />
      </>
    );
  }
};

export default Home;
