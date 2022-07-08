import type { NextPage } from 'next'
import BlogCard from '../components/BlogCard'

const Home: NextPage = () => {
  return (
    <div className="md:w-2/3 w-4/5 flex flex-col justify-center navbar-offset my-center pt-16 gap-4">
      <BlogCard />
      <BlogCard />
      <BlogCard />
      <BlogCard />
    </div>
  )
}

export default Home
