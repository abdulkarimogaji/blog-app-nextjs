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
  const isTag = (blog: BlogType) => {
    if (!filterTag) return true;
    return blog.tags.includes(filterTag);
  };
  const headerMsg = () => {
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
      return "Trending Blogs";
    }
  };
  return (
    <div className="flex border py-16 md:px-8 gap-4 mt-16">
      <SideBar tags={Array.from(tags)} setFilterTag={setFilterTag} />
      <div className="flex flex-col md:gap-8 gap-2 container">
        <h1 className="text-xl font-semibold">
          {headerMsg()}
          {filterTag && (
            <button
              className="border rounded-lg text-xl font-normal bg-gray-200 px-4"
              onClick={() => setFilterTag("")}
            >
              &times;
            </button>
          )}
        </h1>
        {blogs.filter(isTag).map((blog) => (
          <BlogCard data={blog} key={blog._id} setFilterTag={setFilterTag} />
        ))}
      </div>
    </div>
  );
};

export default BlogList;
