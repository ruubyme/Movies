import { useRouter } from "next/router";
import { useEffect } from "react";
import { destroyCookie } from "nookies";

const Logout: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    //쿠키에서 'token'을 제거함
    destroyCookie(null, "token");

    //메인페이지로 redirection
    router.push("/").then(() => {
      window.location.reload();
    });
  }, []);

  return <div>Logout ...</div>;
};

export default Logout;
