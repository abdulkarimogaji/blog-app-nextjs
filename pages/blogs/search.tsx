import { useRouter } from 'next/router'
import { useState } from 'react'
import { useQuery } from 'react-query'
import BlogCard from '../../components/BlogCard'
import SideBar from '../../components/SideBar'
import Spinner from '../../components/Spinner'
import { request } from '../../utils/axios-utils'
import { BlogType, MyResponseType } from '../../utils/types'


const fetchBlogs = (page: number, searchKey: string) => {
  return request({ url: `/blogs/search?searchKey=${searchKey}&page=${page}&limit=10` })
}
const Home = () => {
  const [page, setPage] = useState(1)
  const { searchKey } = useRouter().query
  const { isError, isSuccess, isLoading, data, error } = useQuery<MyResponseType<BlogType[]>, any>(["blogs", searchKey, page], () => fetchBlogs(page, searchKey as string), { keepPreviousData: true })
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
          <h1 className='text-xl font-semibold text-center container'>{data.data.data.length !== 0 ? `Search Results for "${searchKey}"` : `No Result for "${searchKey}"`}</h1>
          {
            data?.data.data.filter(isTag).map(blog => <BlogCard data={blog} key={blog._id} setFilterTag={setFilterTag} />)
          }
        </div>
      </div>
    )
  }

}

export default Home
