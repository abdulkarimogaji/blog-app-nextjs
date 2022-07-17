import { useState } from 'react'
import {  useQuery } from 'react-query'
import BlogCard from '../components/BlogCard'
import Spinner from '../components/Spinner'
import { request } from '../utils/axios-utils'
import { BlogType, MyResponseType } from '../utils/types'


const fetchBlogs = (page: number) => {
  return request({ url: `/blogs?page=${page}&limit=10`})
}

const Home = () => {
  const [page, setPage] = useState(1)
  const { isError, isSuccess, isLoading, data, error } = useQuery<MyResponseType<BlogType[]>, any>(["blogs", page], () => fetchBlogs(page), { keepPreviousData: true})


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
      <div className="md:w-2/3 w-4/5 flex flex-col justify-center navbar-offset my-center md:pt-16 pt-32  pb-16 gap-4">
        {
          filterTag &&
        <h1 className='text-xl font-semibold'>Blogs for tag &quot{filterTag}&quot: <button className='md:p-2 p-1 md:px-4 mr-4 px-2 text-xs md:text-sm action-btn rounded-lg' onClick={() => setFilterTag("")}>Clear</button></h1>
        }
        {
          data?.data.data.filter(isTag).map(blog => <BlogCard data={blog} key={blog._id} setFilterTag={setFilterTag} />)
        }
      </div>
    )
  }
  
}

export default Home
