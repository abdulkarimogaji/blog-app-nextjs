import { faHomeAlt, faTags } from '@fortawesome/free-solid-svg-icons'
import { faAddressBook } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { useState } from 'react'
import { useQuery } from 'react-query'
import BlogCard from '../components/BlogCard'
import Spinner from '../components/Spinner'
import { request } from '../utils/axios-utils'
import { BlogType, MyResponseType } from '../utils/types'
import SideBar from '../components/SideBar'


const fetchBlogs = (page: number) => {
  return request({ url: `/blogs?page=${page}&limit=10` })
}

const Home = () => {
  const [page, setPage] = useState(1)
  const { isError, isSuccess, isLoading, data, error } = useQuery<MyResponseType<BlogType[]>, any>(["blogs", page], () => fetchBlogs(page), { keepPreviousData: true })


  const [filterTag, setFilterTag] = useState("")
  const isTag = (blog: BlogType) => {
    if (!filterTag) return true
    return blog.tags.includes(filterTag)
  }
  if (isError) {
    return <div>{error.message}</div>
  }

  if (isLoading) return <Spinner />

  if (isSuccess) {
    return (
      <div className="flex border  md:pt-16 pb-16 md:px-8 gap-4">
        <SideBar />
        <div className='flex flex-col md:gap-8 gap-2 container'>
          {
            filterTag ?
              <h1 className='text-xl font-semibold'>Blogs for tag <q>{filterTag}</q>: <button className='border rounded-lg text-xl font-normal bg-gray-200 px-4' onClick={() => setFilterTag("")}>&times;</button></h1> : <h1 className='text-xl font-semibold'>Trending Blogs</h1>
          }
          {
            data?.data.data.filter(isTag).map(blog => <BlogCard data={blog} key={blog._id} setFilterTag={setFilterTag} />)
          }
        </div>
      </div>
    )
  }

}

export default Home
