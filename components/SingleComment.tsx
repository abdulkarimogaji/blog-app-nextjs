import { faComment, faHeart } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { dateToMonthDay } from "../utils/date-utils"
import { Comment } from "../utils/types"
import Avatar from "./Avatar"

const SingleComment = ({ data }: { data: Comment}) => {
  return (
    <div className="flex-center container">
      <div className="rounded-lg md:w-2/3 container md:p-8 p-3 md:text-sm text-xs flex md:gap-6 gap-3">
        <Avatar dimension="md:w-15 md:h-15 h-7 w-7" href={`/users/${data.author._id}`}/>
        <div>

        <div className="md:p-6 p-3 border border-gray-300 rounded-lg md:mb-4 mb-2">
          <strong className="mb-3 block">{data.author.firstName} {data.author.lastName} <span className="text-gray-400 text-sm">! {dateToMonthDay(data.createdAt)}</span></strong> 
          {data.text}
        </div>
        <div className="flex btn-hover-container">
            <div className="cursor-pointer">
              <FontAwesomeIcon icon={faHeart} color="#777" />
              {" "}
              Likes(2)
            </div>
            <div className="cursor-pointer">
              <FontAwesomeIcon icon={faComment}  color="#777"/>
              {" "}
              Replies(3)
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleComment