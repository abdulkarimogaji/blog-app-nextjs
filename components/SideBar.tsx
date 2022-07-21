import { faBookOpen, faHeart, faHomeAlt, faTags } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"

const SideBar = () => {
  // 128736 settings
  // 128274 padlock
  // 128214 open book
  // 128163 bomb
  // 128077 thumbs up
  // 128071 point down
  // 127969 house
  // 127918 controller
  return (
    <aside className='hidden md:block w-1/3' style={{maxWidth: "33%"}}>
          <ul className='ml-6'>
            <li>
              <Link href="/" passHref>
                <a className='sidenav-hover block p-3 rounded-lg'><span>&#127969;</span><span className='ml-4'>Home</span></a>
              </Link>
            </li>
            <li>
              <Link href="/" passHref>
                <a className='sidenav-hover block p-3 rounded-lg'><span>&#128736;</span><span className='ml-4'>Issues</span></a>
              </Link>
            </li>
            <li>
              <button className='sidenav-hover container p-3 rounded-lg flex justify-start'><span>&#128071;</span><span className='ml-4'>Tags</span></button>
            </li>
            <ul className="ml-4">
              <li>
                <Link href="/" passHref>
                  <a className='sidenav-hover block p-3 rounded-lg'># gaming</a>
                </Link>
              </li>
            </ul>
            <li>
              <Link href="/" passHref>
                <a className='sidenav-hover block p-3 rounded-lg'><span>&#129505;</span><span className='ml-4'>Sponsors</span></a>
              </Link>
            </li>
            <li>
              <Link href="/" passHref>
                <a className='sidenav-hover block p-3 rounded-lg'><span>&#128188;</span><span className='ml-4'>About</span></a>
              </Link>
            </li>
            <li>
              <Link href="/" passHref>
                <a className='sidenav-hover block p-3 rounded-lg'><span>&#128187;</span><span className='ml-4'>Contact</span></a>
              </Link>
            </li>
            <li>
              <Link href="/" passHref>
                <a className='sidenav-hover block p-3 rounded-lg'><span>&#128214;</span><span className='ml-4'>Guides</span></a>
              </Link>
            </li>
            <li>
              <Link href="/" passHref>
                <a className='sidenav-hover block p-3 rounded-lg'><span>&#129323;</span><span className='ml-4'>Software Comparison</span></a>
              </Link>
            </li>
          </ul>
        </aside>
  )
}

export default SideBar