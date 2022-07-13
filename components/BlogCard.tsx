import { faHeart, faComment } from "@fortawesome/free-regular-svg-icons"
import { faPen } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"
import { useRouter } from "next/router"
import { dateToMonthDay } from "../utils/date-utils"
import { BlogType } from "../utils/types"
import Avatar from "./Avatar"


const BlogCard = ({ data }: { data: BlogType}) => {
  const router = useRouter()
  return (
    <div className="flex bg-white container rounded-sm md:p-8 p-3 md:gap-6 gap-2">
      <Avatar dimension="md:w-10 md:h-10 w-7 h-7" href={`/users/${data.author._id}`} />
      <div className="container">
        <p>{data.author.username}</p>
        <small>{dateToMonthDay(data.createdAt)}</small>
        <Link href={`/blogs/${data._id}`} passHref>
          <a className="link-hover"><h1 className="md:text-2xl text-base font-bold my-3">{data.title}</h1></a>
        </Link>
        <div className="flex md:gap-8 gap-4 flex-wrap md:text-sm text-xs btn-hover-container">
          {
            data.tags.map(tag => <button key={tag}># {tag}</button>)
          }
        </div>
        <div className="flex md:justify-between flex-wrap md:mt-8 mt-2 text-xs md:text-base">
          <div className="flex btn-hover-container">
            <button className="cursor-pointer">
              <FontAwesomeIcon icon={faHeart} color="#777" />
              {" "}
              Views({data.view_count + data.like_count})
            </button>
            <button onClick={() => {
              router.push(`blogs/${data._id}#comments`)
            }}>
              <FontAwesomeIcon icon={faPen}  color="#777"/>
              {" "}
              Comments({data.comments.length})
            </button>
          </div>
          <div className="md:block hidden">
            <span className="md:mr-8 mr-4">4 min read</span>
            <button className="rounded-md bg-gray-200 py-2 px-6">Save</button>
          </div>
        </div>
      </div>
    </div>
  )
}


export default BlogCard