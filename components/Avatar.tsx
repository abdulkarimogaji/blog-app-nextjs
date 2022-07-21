import Image from "next/image";
import Link from "next/link";

type Props = {
  dimension: string;
  href: string;
  src: string;
};

const Avatar = ({ dimension, href, src }: Props) => {
  return (
    <Link href={href} passHref>
      <a className="flex-center">
        <div className={`relative ${dimension}`}>
          <Image
            src={src || "/default_avatar.jfif"}
            alt="avatar"
            layout="fill"
            style={{ borderRadius: 999 }}
          />
        </div>
      </a>
    </Link>
  );
};

export default Avatar;
