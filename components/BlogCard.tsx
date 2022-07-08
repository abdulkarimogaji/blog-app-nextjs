import { faHeart, faComment } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"
import Link from "next/link"


const BlogCard = () => {
  return (
    <div className="flex bg-white container rounded-sm md:p-8 p-3 md:gap-4 gap-2">
      <div className="flex-center">
        <div className="relative md:w-10 md:h-10 w-7 h-7">
          <Image
            src="/user_avatar.jpeg"
            alt="user_avatar"
            layout="fill"
            style={{ borderRadius: 999 }}
          />
        </div>
      </div>
      <div>
        <p>The Coding Mermaid</p>
        <small>Jul 5</small>
        <Link href="/" passHref>
          <a className="link-hover"><h1 className="md:text-3xl text-lg font-bold my-4">If you could add one feature to postman what will it be</h1></a>
        </Link>
        <div className="flex md:gap-8 gap-4 flex-wrap btn-hover-container">
          <button># javascript</button>
          <button># beginners</button>
          <button># api</button>
        </div>
        <div className="flex md:justify-between flex-wrap md:mt-8 mt-4">
          <div className="flex btn-hover-container">
            <div className="cursor-pointer">
              <FontAwesomeIcon icon={faHeart} color="#777" />
              {" "}
              Reactions
            </div>
            <div className="cursor-pointer">
              <FontAwesomeIcon icon={faComment}  color="#777"/>
              {" "}
              Comments
            </div>
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