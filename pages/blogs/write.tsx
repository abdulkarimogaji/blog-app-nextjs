import { useRouter } from "next/router"
import { useEffect, useRef, useState } from "react"
import { useMutation } from "react-query"
import BlogSectionForm from "../../components/BlogSectionForm"
import Spinner from "../../components/Spinner"
import { useUserContext } from "../../context/useUserContext"
import { request } from "../../utils/axios-utils"


const createBlog = (data: any) => {
  return request({ url: "/blogs", method: "post", data })
} 


const Create = () => {
  const { userData } = useUserContext()
  const isAnonymous = useRef<HTMLInputElement>(null!)
  const [sectionCount, setSectionCount] = useState(1)

  const router = useRouter()

  useEffect(() => {
    if (userData._id == "") {
      router.replace("/login")
    }
  }, [])
  const addSection = () => {
    setSectionCount(sectionCount+1)
  }
  const allSections: string[] = []
  for (let i = 1; i < sectionCount+1; i++) {
    allSections.push("")
  }

  const { mutate, isLoading } = useMutation(createBlog, {
    onSuccess: () => {
      router.push("/users/me")
    },
  }) 

  const handleSubmit = (e:any) => {
    e.preventDefault();
    const introTitle = e.target.elements.introTitle.value 
    const introContent = e.target.elements.introContent.value
    const tags = e.target.elements.tags.value.split(",")
    const sections = []
    for (let i = 1; i < sectionCount+1; i++) {
      const singleSection = { title: e.target.elements[`sectionTitle${i}`].value, content: e.target.elements[`sectionContent${i}`].value}
      sections.push(singleSection)
    } 
    const body = {
      title: introTitle,
      intro: { title: introTitle , content: introContent },
      sections,
      isAnonymous: isAnonymous.current.checked,
      tags
    }
    mutate(body)
  }

  if (isLoading) return <Spinner />

  return (
    <div className="navbar-offset md:p-16 p-8">
      <h1 className="text-lg md:text-3xl md:mb-16 mb-8">New Blog By <strong>{userData.username}</strong></h1>
      <form className="md:w-4/5 container my-center" onSubmit={handleSubmit}>
        <section className="bg-white md:p-8 p-4 border border-gray-300 rounded-lg my-8">
          <input type="checkbox" id="isAnonymous" className="toggle" ref={isAnonymous}/>
          <label htmlFor="isAnonymous" className="my-8 w-16"></label>
          <p className="my-2 md:mb-16 mb-8">Write as anonymous</p>
          <h2 className="md:text-lg text-base md:text-2xl md:mb-16 mb-8">Introduction</h2>
          <div className="my-12">
            <p className="md:text-lg text-base font-semibold mb-4">Blog Title*</p>
            <input type="text" placeholder="Blog Title" name="introTitle" className="border hover:border-gray-600 focus:border-gray-600 container rounded-lg p-2 pe-5 md:text-base text-sm outline-none" />
          </div>
          <div className="my-12">
            <p className="md:text-lg text-base font-semibold mb-4">Tags (keywords for search)</p>
            <input type="text" placeholder="Seperate tags with comma e.g politics, sports" name="tags" className="border hover:border-gray-600 focus:border-gray-600 container rounded-lg p-2 pe-5 md:text-base text-sm outline-none" />
          </div>
          <div className="my-12">
            <p className="md:text-lg text-base font-semibold mb-4">Content</p>
            <textarea placeholder="Content" name="introContent" className="border hover:border-gray-600 focus:border-gray-600 container rounded-lg p-2 pe-5 md:text-base text-sm outline-none" />
          </div>
        </section>
        {
          allSections.map((_v, idx) => <BlogSectionForm key={idx+1} secNum={idx+1}/>)
        }
        <button type="button" className="block action-btn2 p-2 px-4 rounded-md mb-4" onClick={addSection}>Add Another Section</button>
        <button type="submit" className="p-2 px-4 action-btn rounded-lg block">Create Blog</button>
      </form>
    </div>
  )
}


export default Create