import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Avatar from "../../components/Avatar";
import SingleComment from "../../components/SingleComment";
import Spinner from "../../components/Spinner";
import { useUserContext } from "../../context/useUserContext";
import { request } from "../../utils/axios-utils";
import { dateToMonthDay, getReadTime } from "../../utils/date-utils";
import { BlogType, Comment, MyResponseType } from "../../utils/types";


const fetchBlog = (id: string) => {
  return request({ url: `/blogs/${id}` })
}

const sendComment = (body: any) => {
  return request({ url: "/comments", method: "post", data: body })
}

const viewBlog = (id: string) => {
  return request({ url: `/blogs/${id}/view`, method: "patch"})
}

const BlogDetail = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const [newComment, setNewComment] = useState("")
  const { userData } = useUserContext()
  const { id } = router.query
  const { data: resp, isSuccess, isLoading } = useQuery<MyResponseType<BlogType>>(["blogs", id as string], () => fetchBlog(id as string))

  useQuery(["blogs-view", id], () => viewBlog(id as string))

  const { mutate } = useMutation<MyResponseType<Comment>, any, any>(sendComment,{
    onMutate: async(newComment) => {
      await queryClient.cancelQueries(["blogs", id])
      const previousBlog = queryClient.getQueryData<MyResponseType<BlogType>>(["blogs", id])
      queryClient.setQueryData<any>(["blogs", id], (prev: any) => {
        newComment.author = userData
        newComment.createdAt = new Date(Date.now()).toLocaleDateString()
        return {
          ...prev,
          data: { ...prev?.data, data: { ...prev?.data.data, comments: [newComment, ...prev?.data.data.comments]}}
        }
      })
      setNewComment("")
      return { previousBlog }
    },
    onError: (_error, _v, context: any) => {
      queryClient.setQueryData(["blogs", id], context.previousBlog)
    },
    onSettled: () => {},
  })

  const addComment = () => {
    if (!userData.username) {
      router.push("/login")
    }
    if (newComment.length > 1) {
      mutate({
        blog: resp?.data.data._id,
        isAnonymous: false,
        text: newComment
      })
    }
  }

  if (isLoading) return <Spinner />

  if (isSuccess) {
    const { data: blog } = resp?.data!
    return (
      <section className=" bg-white">
        <div className="flex-center">
          {
            blog.intro.image ? (<div className="relative md:w-3/4 w-4/5 h-64 md:h-96">
            <Image src={blog.intro.image} alt="cover_img" layout="fill" objectFit="cover" />
          </div>): (<><br /><br /><br /></>)
          }
      
        </div>
        {/* blog title */}
        <div className="text-center">
          <h1 className="md:text-5xl text-2xl text-center md:my-8 my-5 md:px-80 px-10 leading-relaxed">
            {blog.title}
          </h1>
          <Avatar dimension="w-20 h-20 mb-2" href={`/users/${blog.author._id}`} src={blog.author.picture} />
          <div className="text-sm mb-4">
            BY {blog.author.username}, UPDATED ON {dateToMonthDay(blog.updatedAt)}
          </div>
          <div className="text-lg">{getReadTime(blog)} Mins read</div>
        </div>

        {/* blog content */}
        <article className="flex-center">
          <div className="w-3/4 md:w-4/5">
            {/* Intro */}
            <section className="md:my-16 my-8 md:px-32 px-4 ">
              <h2></h2>
              <p className="md:text-xl text-base leading-loose">
                {blog.intro.content}
              </p>
              {/* timestamps */}
              <ol className="flex flex-col md:gap-6 gap-3 md:text-xl text-base md:my-8 my-4 md:pl-6 pl-3 timestamp-ol">
                {
                  blog.sections.filter(sec => sec.title).map(sec => (
                    <li key={sec.title}>
                      <a href={`#${sec.title}`} >{sec.title}</a>
                    </li>
                  ))
                }

              </ol>
              <div className="flex-center"></div>
            </section>

            {/* Body 1 */}
            {
              blog.sections.map((sec, i) => (
                <section className="md:my-16 my-8 md:px-32 px-4" id={sec.title} key={sec.title}>
                  {sec.title && <h2 className="md:text-5xl text-lg md:mb-8 mb-4">{sec.title}</h2>}
                  <p className="md:text-xl text-base leading-relaxed">
                    {sec.content}
                  </p>
                  <div className="flex-center md:my-16 my-8"> {
                    sec.image ? (<div className="relative md:w-3/4 w-4/5 md:h-96 h-40">
                    <Image
                      src={sec.image}
                      alt="example"
                      layout="fill"
                    />
                  </div>): <br />
                  }
                    
                  </div>
                </section>
              ))
            }

            {/* author details */}
            <div className="flex-center">
              <div className="rounded-lg bg-gray-200 md:w-2/3 container md:p-8 p-3 md:text-sm text-xs flex md:gap-6 gap-3">
                <Avatar dimension="md:w-20 md:h-20 h-10 w-10" href={`/users/${blog.author._id}`} src={blog.author.picture} />
                <div>
                  <strong>{blog.author.firstName} {blog.author.lastName}</strong>
                  <p>{blog.author.username}</p>
                  <br />
                  <br />
                  <p>
                    {blog.author.about}
                  </p>
                </div>
              </div>
            </div>
            {/* Comments Section */}
            <section id="comments"></section>
            <div className="flex flex-col items-center md:my-32 my-16">
              <h1 className="md:text-3xl text-lg mb-16">Comments({blog.comments.length})</h1>
              <div className="flex-center container">
                <div className="rounded-lg md:w-2/3 container md:p-8 p-3 md:text-sm text-xs flex md:gap-6 gap-3">
                  <div className="flex-center">
                    <div className="relative md:w-15 md:h-15 h-7 w-7">
                      <Image
                        src={userData.picture || "/user_avatar.jfif"}
                        alt="user_avatar"
                        layout="fill"
                        style={{ borderRadius: 999 }}
                      />
                    </div>
                  </div>
                  <div className="container">
                    <textarea rows={7} placeholder="Write Comment" value={newComment} onChange={e => setNewComment(e.target.value)} className="border hover:border-gray-600 focus:border-gray-600 container rounded-lg p-2 pe-5 md:text-base text-sm outline-none" />
                    <button type="submit" onClick={addComment} className="md:p-2 p-1 md:px-4 px-2 text-xs md:text-sm action-btn rounded-lg block my-2">Submit</button>

                  </div>

                </div>
              </div>
              {
                blog.comments.map(com => <SingleComment key={com._id} data={com} />)
              }
            </div>
          </div>
        </article>
      </section>
    );
  }
};

export default BlogDetail;
