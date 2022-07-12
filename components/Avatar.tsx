import Image from "next/image";
import Link from "next/link";


type Props = {
  dimension: string;
  href: string;
}

const Avatar = ({ dimension, href }: Props) => {
  return (
    <Link href={href} passHref>
      <a className="flex-center">
        <div className={`relative ${dimension}`}>
          <Image
            src="/user_avatar.jpeg"
            alt="user_avatar"
            layout="fill"
            style={{ borderRadius: 999 }}
          />
        </div>
      </a>
    </Link>
  )
}

export default Avatar;