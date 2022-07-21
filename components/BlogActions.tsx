import { faEye } from "@fortawesome/free-regular-svg-icons";
import { faHouse, faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { request } from "../utils/axios-utils";
import { BlogType } from "../utils/types";

const viewBlog = (id: string) => {
  return request({ url: `/blogs/${id}/view`, method: "patch" });
};

const likeBlogMutation = (id: string) => {
  return request({ url: `/blogs/${id}/like`, method: "patch" });
};

const BlogActions = ({ blog }: { blog: BlogType }) => {
  // view blog on page load
  useQuery(["blogs-view", blog._id], () => viewBlog(blog._id));

  // like blog
  const { mutate: likeBlog } = useMutation(likeBlogMutation, {
    onSuccess: () => {
      useQueryClient().invalidateQueries(["blogs", blog._id]);
    },
  });

  return (
    <aside className="fixed left-0 md:top-0 bottom-0 md:w-24 container rounded-lg flex items-center justify-center">
      <ul className="flex md:flex-col md:gap-8 gap-4 bg-mybg2 border-2 border md:py-16 container items-center justify-center">
        <li>
          <Link href="/" passHref>
            <a className="p-3 rounded-full border hover:bg-gray-300">
              <FontAwesomeIcon icon={faHouse} />
            </a>
          </Link>
        </li>
        <li>
          <button
            className="p-3 rounded-full border hover:bg-gray-300"
            onClick={() => likeBlog(blog._id)}
          >
            <span>&#128077;</span> {blog.like_count}
          </button>
        </li>
        <li>
          <button className="p-3 rounded-full border hover:bg-gray-300">
            <FontAwesomeIcon icon={faEye} /> {blog.view_count}
          </button>
        </li>
        <li>
          <a
            className="p-3 rounded-full border hover:bg-gray-300"
            href="#comments"
          >
            <FontAwesomeIcon icon={faPen} /> {blog.comments.length}
          </a>
        </li>
      </ul>
    </aside>
  );
};

export default BlogActions;
