import { request } from "../utils/axios-utils";
import { dateToMonthDay } from "../utils/date-utils";
import { Comment } from "../utils/types";
import Avatar from "./Avatar";

import { faComment, faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation, useQueryClient } from "react-query";

const likeComment = (id: string) => {
  return request({ url: `/comments/${id}`, method: "patch" });
};
const SingleComment = ({ data }: { data: Comment }) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(likeComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(["blogs", data.blog]);
    },
  });
  return (
    <div className="flex-center container">
      <div className="rounded-lg md:w-2/3 container md:p-8 p-3 md:text-sm text-xs flex md:gap-6 gap-3">
        <Avatar
          dimension="md:w-15 md:h-15 h-7 w-7"
          href={`/users/${data.author._id}`}
          src={data.author.picture}
        />
        <div>
          <div className="md:p-6 p-3 border border-gray-300 rounded-lg md:mb-4 mb-2">
            <strong className="mb-3 block">
              {data.author.username}{" "}
              <span className="text-gray-400 text-sm">
                &bull;{dateToMonthDay(data.createdAt)}
              </span>
            </strong>
            {data.text}
          </div>
          <div className="flex btn-hover-container">
            <button className="cursor-pointer" onClick={() => mutate(data._id)}>
              <FontAwesomeIcon icon={faHeart} color="#777" /> Likes(
              {data.like_count || 0})
            </button>
            <div>
              <FontAwesomeIcon icon={faComment} color="#777" /> Replies
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleComment;
