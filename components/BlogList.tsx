import { useState } from "react";

import { BlogType } from "../utils/types";
import BlogCard from "./BlogCard";
import SideBar from "./SideBar";

type Props = {
  blogs: BlogType[];
  tags: Set<string>;
  searchKey?: string;
};

const BlogList = ({ blogs, tags, searchKey }: Props) => {
  const [filterTag, setFilterTag] = useState("");
  const [sortType, setSortType] = useState<
    "Recent" | "Most Viewed" | "Relevant"
  >("Recent");
  const isTag = (blog: BlogType) => {
    if (!filterTag) return true;
    return blog.tags.includes(filterTag);
  };
  const sortFn = (a: BlogType, b: BlogType) => {
    switch (sortType) {
      case "Recent":
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case "Most Viewed":
        return b.view_count - a.view_count;
      case "Relevant":
        return (
          b.comments.length + b.like_count - (a.comments.length + a.like_count)
        );
      default:
        return 1;
    }
  };
  const getHeaderMsg = () => {
    if (searchKey && filterTag) {
      return blogs.length > 0
        ? `Results for search "${searchKey}" with Tag "${filterTag}"`
        : `No Results for search "${searchKey}" with Tag "${filterTag}"`;
    } else if (searchKey) {
      return blogs.length > 0
        ? `Results for search "${searchKey}"`
        : `No Results for search "${searchKey}"`;
    } else if (filterTag) {
      return blogs.length > 0
        ? `Results for Tag "${filterTag}"`
        : `No Results for Tag "${filterTag}"`;
    } else {
      return "";
    }
  };
  var msg = getHeaderMsg();
  return (
    <section className="flex border border-red-500 py-16 md:px-8 gap-4 mt-16">
      <SideBar tags={Array.from(tags)} setFilterTag={setFilterTag} />
      <div className="flex flex-col md:gap-8 gap-2 container">
        {msg && (
          <h1 className="text-xl font-semibold">
            {msg}
            {filterTag && (
              <button
                className="border rounded-lg text-xl font-normal bg-gray-200 px-4"
                onClick={() => setFilterTag("")}
              >
                &times;
              </button>
            )}
          </h1>
        )}
        <ul className="flex border-b border-gray-300 block w-96 max-w-full text-">
          <li
            className={`${
              sortType == "Recent" && "font-semibold"
            } hover:font-semibold rounded-md p-2 px-4`}
          >
            <button onClick={() => setSortType("Recent")}>Recent</button>
          </li>
          <li
            className={`${
              sortType == "Most Viewed" && "font-semibold"
            } hover:font-semibold rounded-md p-2 px-4`}
          >
            <button onClick={() => setSortType("Most Viewed")}>
              Most Viewed
            </button>
          </li>
          <li
            className={`${
              sortType == "Relevant" && "font-semibold"
            } hover:font-semibold rounded-md p-2 px-4`}
          >
            <button onClick={() => setSortType("Relevant")}>Relevant</button>
          </li>
        </ul>
        {blogs
          .filter(isTag)
          .sort(sortFn)
          .map((blog) => (
            <BlogCard data={blog} key={blog._id} setFilterTag={setFilterTag} />
          ))}
      </div>
    </section>
  );
};

export default BlogList;
