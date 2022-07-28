import {
  faGithub,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-200 md:p-16 mt-8 p-4 flex justify-between">
      <div>
        <h1 className="md:text-xl text-base font-bold">
          Subscribe to our newsletter
        </h1>
        <p className="text-xs md:text-base">
          Don't join our newsletter for inspiring stories about the world and
          how you can make a difference.
        </p>
      </div>
      <div className="flex flex-wrap md:gap-4 gap-2">
        <a
          href="https://twitter.com/abdoolkareem_"
          target="_blank"
          rel="noreferrer"
          className="link-hover"
        >
          <FontAwesomeIcon icon={faTwitter} size="lg" />
        </a>
        <a
          href="https://linkedin.com/in/abdulkarim-ogaji"
          target="_blank"
          rel="noreferrer"
          className="link-hover"
        >
          <FontAwesomeIcon icon={faLinkedin} size="lg" />
        </a>
        <a
          href="https://github.com/AbdulkarimOgaji"
          target="_blank"
          rel="noreferrer"
          className="link-hover"
        >
          <FontAwesomeIcon icon={faGithub} size="lg" />
        </a>

        <Link href="/" passHref>
          <a className="link-hover">
            <h1
              className="font-bold md:text-lg text-sm"
              style={{
                fontFamily: "Fontdiner Swanky",
              }}
            >
              Blognado
            </h1>
          </a>
        </Link>
      </div>
    </footer>
  );
};
export default Footer;
