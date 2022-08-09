import Link from "next/link";
import { SetStateAction } from "react";

type Props = {
  tags: string[];
  setFilterTag: React.Dispatch<SetStateAction<string>>;
};
const SideBar = ({ tags, setFilterTag }: Props) => {
  return (
    <aside className="hidden md:block w-1/3" style={{ maxWidth: "33%" }}>
      <ul className="ml-6">
        <li>
          <Link href="/" passHref>
            <a className="sidenav-hover block p-3 rounded-lg">
              <span>&#127969;</span>
              <span className="ml-4">Home</span>
            </a>
          </Link>
        </li>
        <li>
          <a
            className="sidenav-hover block p-3 rounded-lg"
            target="_blank"
            rel="noreferrer"
            href="https://github.com/AbdulkarimOgaji/blog-app-nextjs/issues"
          >
            <span>&#128736;</span>
            <span className="ml-4">Issues</span>
          </a>
        </li>
        <details className="ml-4">
          <summary className="sidenav-hover cursor-pointer container p-3 rounded-lg flex justify-start">
            <span>&#128071;</span>
            <span className="ml-4">Tags</span>
          </summary>
          {tags.map((tag) => (
            <li key={tag}>
              <button
                onClick={() => setFilterTag(tag)}
                className="sidenav-hover block p-3 rounded-lg"
              >
                #{tag}
              </button>
            </li>
          ))}
        </details>
        <li>
          <Link href="/" passHref>
            <a className="sidenav-hover block p-3 rounded-lg">
              <span>&#129505;</span>
              <span className="ml-4">Sponsors</span>
            </a>
          </Link>
        </li>
        <li>
          <a
            className="sidenav-hover block p-3 rounded-lg"
            target="_blank"
            rel="noreferrer"
            href="https://github.com/AbdulkarimOgaji/blog-app-nextjs#readme"
          >
            <span>&#128188;</span>
            <span className="ml-4">About</span>
          </a>
        </li>
        <li>
          <Link href="/" passHref>
            <a className="sidenav-hover block p-3 rounded-lg">
              <span>&#128187;</span>
              <span className="ml-4">Contact</span>
            </a>
          </Link>
        </li>
        <li>
          <a
            className="sidenav-hover block p-3 rounded-lg"
            target="_blank"
            rel="noreferrer"
            href="https://github.com/AbdulkarimOgaji/blog-app-nestjs#readme"
          >
            <span>&#128214;</span>
            <span className="ml-4">Guides</span>
          </a>
        </li>
        <li>
          <Link href="/" passHref>
            <a className="sidenav-hover block p-3 rounded-lg">
              <span>&#129323;</span>
              <span className="ml-4">Software Comparison</span>
            </a>
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default SideBar;
