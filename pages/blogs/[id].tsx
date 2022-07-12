import Image from "next/image";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import SingleComment from "../../components/SingleComment";
import { request } from "../../utils/axios-utils";
import { BlogType, MyResponseType } from "../../utils/types";


const fetchBlog = (id: string) => {
  return request({ url: `/blogs/${id}` })
}
const BlogDetail = () => {
  const router = useRouter()
  const { id } = router.query
  const { data: resp, isSuccess, error, isLoading, isError } = useQuery<MyResponseType<BlogType>>(["blogs", id], () => fetchBlog(id as string))

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
            BY {blog.author.displayName}, UPDATED ON {blog.updatedAt}, 2022
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
                <section className="md:my-16 my-8 md:px-32 px-4">
                  <h2 className="md:text-5xl text-lg md:mb-8 mb-4">{i}. {sec.title}</h2>
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
                  <p>{blog.author.displayName}</p>
                  <br />
                  <br />
                  <p>
                    {blog.author.description}
                  </p>
                </div>
              </div>
            </div>
            {/* Comments Section */}
            <a href="#comments"></a>
            <div className="flex flex-col items-center md:my-32 my-16">
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
                    <textarea placeholder="Write Comment" className="border hover:border-gray-600 focus:border-gray-600 container rounded-lg p-2 pe-5 md:text-base text-sm outline-none" />
                    <button type="submit" className="p-2 px-4 text-xs action-btn rounded-lg block">Submit</button>

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
