import BlogSectionForm from "../components/BlogSectionForm"
import { BlogType } from "./types"

export function dateToMonthDay(respDate: string) {
  const date = new Date(new Date(Date.parse(respDate)))
  return date.toDateString()
}


export function getReadTime(blog: BlogType) {
  var totalChar = 0
  totalChar += blog.title.length + blog.intro.title.length + blog.intro.content.length
  blog.sections.forEach(s => {
    totalChar += s.title.length + s.content.length
  })
  blog.comments.forEach(c => {
    totalChar += c.text.length
  })

  return Math.floor(totalChar/1250)
}