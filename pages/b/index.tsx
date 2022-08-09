import { useRouter } from "next/router";
import { useEffect } from "react";

const RedirectHome = () => {
  const router = useRouter();
  useEffect(() => {
    router.replace("/");
  }, []);
  return <></>;
};

export default RedirectHome;
