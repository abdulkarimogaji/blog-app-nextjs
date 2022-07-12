import { ResponseType } from 'axios'
import { useState } from 'react'
import {  useQuery } from 'react-query'
import BlogCard from '../components/BlogCard'
import { request } from '../utils/axios-utils'
import { BlogType, MyResponseType } from '../utils/types'


const fetchBlogs = (page: number) => {
  return request({ url: `/blogs?page=${page}&limit=10`})
}
const Home = () => {
  const [page, setPage] = useState(1)
  const { isError, isSuccess, isLoading, data, error } = useQuery<MyResponseType<BlogType[]>, any>(["blogs", page], () => fetchBlogs(page), { keepPreviousData: true})

  if (isError) {
    console.log(error)
    return <div>{error.message}</div>
  }

  if (isLoading) return <div>Loading</div>

  if (isSuccess) {
    console.log(data)
    return (
      <div className="md:w-2/3 w-4/5 flex flex-col justify-center navbar-offset my-center pt-16 gap-4">
        {
          data?.data.data.map(blog => <BlogCard data={blog} key={blog._id} />)
        }
      </div>
    )
  }
  
}

export default Home
