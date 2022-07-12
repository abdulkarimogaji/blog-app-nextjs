import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import SingleComment from "../../components/SingleComment";
import { request } from "../../utils/axios-utils";
import { BlogType, Comment, MyResponseType } from "../../utils/types";


const fetchBlog = (id: string) => {
  return request({ url: `/blogs/${id}` })
}

const sendComment = (body: any) => {
  return request({ url: "/comments", method: "post", data: body })
}

const BlogDetail = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const [newComment, setNewComment] = useState("")
  const { id } = router.query
  const { data: resp, isSuccess, isLoading } = useQuery<MyResponseType<BlogType>>(["blogs", id as string], () => fetchBlog(router.query.id as string))

  const { mutate } = useMutation<MyResponseType<Comment>, any, any>(sendComment,{
    onMutate: async(newComment) => {
      await queryClient.cancelQueries(["blogs", id])
      const previousBlog = queryClient.getQueryData<MyResponseType<BlogType>>(["blogs", id])
      queryClient.setQueryData<any>(["blogs", id], (prev: any) => {
        return {
          ...prev,
          data: { ...prev?.data, data: { ...prev?.data.data, comments: [...prev?.data.data.comments, newComment]}}
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
    if (newComment.length > 1) {
      mutate({
        blog: resp?.data.data._id,
        isAnonymous: false,
        text: newComment
      })
    }
  }

  if (isLoading) return <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut aut laborum fugiat, excepturi incidunt in minima. Incidunt, eligendi cum veniam exercitationem fuga dolor eius sunt saepe optio modi obcaecati reprehenderit amet culpa illo illum, nam soluta dignissimos quidem. Nisi, sed repellat at voluptatem minus temporibus impedit. Ipsa labore quae natus, odio corporis optio, deserunt magni, laborum architecto iure a exercitationem illum eos mollitia accusamus soluta repellat quidem quisquam earum molestiae provident quos eaque cumque. Impedit culpa quo nesciunt! Cum atque eveniet dolorum ipsam obcaecati ad, fuga aliquid aspernatur ut suscipit possimus voluptatem enim culpa pariatur est laborum beatae eius ducimus!</div>

  if (isSuccess) {
    const { data: blog } = resp?.data!
    return (
      <section className="navbar-offset bg-white">
        <div className="flex-center">
          <div className="relative md:w-3/4 w-4/5 h-64 md:h-96">
            <Image src="/cover_img.jpg" alt="cover_img" layout="fill" objectFit="cover" />
          </div>
        </div>
        {/* blog title */}
        <div className="text-center">
          <h1 className="md:text-5xl text-2xl text-center md:my-8 my-5 md:px-80 px-10 leading-relaxed">
            {blog.title}
          </h1>
          <div className="flex-center mb-2">
            <div className="relative w-20 h-20">
              <Image
                src="/user_avatar.jpeg"
                alt="user_avatar"
                layout="fill"
                style={{ borderRadius: 999 }}
              />
            </div>
          </div>
          <div className="text-sm mb-4">
            BY {blog.author.username}, UPDATED ON {blog.updatedAt}, 2022
          </div>
          <div className="text-lg">13 Mins read</div>
        </div>

        {/* blog content */}
        <div className="flex-center">
          <div className="w-3/4 md:w-4/5">
            {/* Intro */}
            <section className="md:my-16 my-8 md:px-32 px-4 ">
              <h2>{blog.intro.title}</h2>
              <p className="md:text-xl text-base leading-relaxed">
                {blog.intro.content}
              </p>
              {/* timestamps */}
              <ol className="flex flex-col md:gap-6 gap-3 md:text-xl text-base md:my-8 my-4 md:pl-6 pl-3 timestamp-ol">
                {
                  blog.sections.map(sec => (
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
                  <h2 className="md:text-5xl text-lg md:mb-8 mb-4">{i+1}. {sec.title}</h2>
                  <p className="md:text-xl text-base leading-relaxed">
                    {sec.content}
                  </p>
                  <div className="flex-center md:my-16 my-8">
                    <div className="relative md:w-3/4 w-4/5 md:h-96 h-40">
                      <Image
                        src="/example_blog_img.jpg"
                        alt="example"
                        layout="fill"
                      />
                    </div>
                  </div>
                </section>
              ))
            }

            {/* author details */}
            <div className="flex-center">
              <div className="rounded-lg bg-gray-200 md:w-2/3 container md:p-8 p-3 md:text-sm text-xs flex md:gap-6 gap-3">
                <div className="flex-center">
                  <div className="relative md:w-20 md:h-20 h-10 w-10">
                    <Image
                      src="/user_avatar.jpeg"
                      alt="user_avatar"
                      layout="fill"
                      style={{ borderRadius: 999 }}
                    />
                  </div>
                </div>
                <div>
                  <strong>{blog.author.firstName} {blog.author.lastName}</strong>
                  <p>{blog.author.username}</p>
                  <br />
                  <br />
                  <p>
                    {blog.author.description}
                  </p>
                </div>
              </div>
            </div>
            {/* Comments Section */}
            <div className="flex flex-col items-center md:my-32 my-16" id="comments">
              <h1 className="md:text-3xl text-lg mb-16">Comments({blog.comments.length})</h1>
              <div className="flex-center container">
                <div className="rounded-lg md:w-2/3 container md:p-8 p-3 md:text-sm text-xs flex md:gap-6 gap-3">
                  <div className="flex-center">
                    <div className="relative md:w-15 md:h-15 h-7 w-7">
                      <Image
                        src="/user_avatar.jpeg"
                        alt="user_avatar"
                        layout="fill"
                        style={{ borderRadius: 999 }}
                      />
                    </div>
                  </div>
                  <div className="container">
                    <textarea placeholder="Write Comment" value={newComment} onChange={e => setNewComment(e.target.value)} className="border hover:border-gray-600 focus:border-gray-600 container rounded-lg p-2 pe-5 md:text-base text-sm outline-none" />
                    <button type="submit" onClick={addComment} className="p-2 px-4 text-xs action-btn rounded-lg block">Submit</button>

                  </div>

                </div>
              </div>
              {
                blog.comments.map(com => <SingleComment key={com._id} data={com} />)
              }
            </div>
          </div>
        </div>
      </section>
    );
  }
};

export default BlogDetail;
