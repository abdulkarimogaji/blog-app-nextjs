import { faChessBishop, faHeart } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"
import Link from "next/link"
import { useQuery } from "react-query"
import { useUserContext } from "../../context/useUserContext"
import { request } from "../../utils/axios-utils"
import { dateToMonthDay } from "../../utils/date-utils"
import { LoginResponse } from "../../utils/types"


const fetchUser = () => {
  return request({ url: "/users/me"})
}

const Profile = () => {

  const { userData } = useUserContext()
  console.log(userData)
  const { data, isSuccess} = useQuery<LoginResponse>(["me"], fetchUser)

  if (isSuccess) {
    const { user } = data.data
    return (
      <div>
        <div className="bg-mybg p-24"></div>
        <div className="flex items-center flex-col md:w-2/3 w-4/5 my-center gap-4">
          <div className="-mt-12 bg-white relative border rounded-lg container p-4 md:pt-20 pt-12 text-center">
            <div className="absolute md:-top-16 -top-8 border-8 rounded-full bg-myborder profile-image">
              <div className="relative md:w-32 md:h-32 h-16 w-16">
                <Image
                  src="/user_avatar.jpeg"
                  alt="user_avatar"
                  layout="fill"
                  style={{ borderRadius: 999 }}
                />
              </div>
            </div>
            <div className="text-end">
              <button className="p-2 text-xs px-4 action-btn2 rounded-lg">Edit Profile</button>
            </div>
            <h1 className="md:text-2xl text-lg font-semibold my-4">{user.firstName} {user.lastName}</h1>
            <p className="my-4">{user.description}</p>
            <p className="my-8 text-gray-400">Joined {dateToMonthDay(user.createdAt)} {" "}<FontAwesomeIcon icon={faChessBishop} color="#777" /></p>
          </div>
          <div className="flex md:gap-8 gap-2 container text-xs md:text-sm">
            <div className="w-1/3 bg-white border rounded-lg p-2 bg-gray-100">
              <div className="my-2 p-2">
                <FontAwesomeIcon icon={faHeart} color="#777" />
                {" "}
                Blogs written
              </div>
              <div className="my-2 p-2">
                <FontAwesomeIcon icon={faHeart} color="#777" />
                {" "}
                Comments written
              </div>
              <div className="my-2 p-2">
                <FontAwesomeIcon icon={faHeart} color="#777" />
                {" "}
                Tags Followed
              </div>
            </div>
            <div className="w-2/3 bg-white border rounded-lg p-2">
              <h2 className="text-lg font-semibold mb-4">Recent Comments</h2>
              <Link href="/blogs/:id" passHref>
                <a className="p-2 cursor-pointer hover:bg-gray-100 focus:bg-gray-100 block"> API testing with something</a>
              </Link>
              <Link href="/blogs/:id" passHref>
                <a className="p-2 cursor-pointer hover:bg-gray-100 focus:bg-gray-100 block"> Blogs written</a>
              </Link>
              <Link href="/blogs/:id" passHref>
                <a className="p-2 cursor-pointer hover:bg-gray-100 focus:bg-gray-100 block"> API testing with something</a>
              </Link>
            </div>
          </div>
        </div>
  
      </div>
    )
  }
  
}



export default Profile