import Link from "next/link";
import { parseCookies } from "nookies";
import { useState, useEffect } from "react";
import userImage from "../public/userImage.svg";
import Image from "next/image";

const Header: React.FC = () => {
  const [isClient, setIsClient] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const checkLoginStatus = () => {
    const cookies = parseCookies();
    if (cookies.token) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  };

  useEffect(() => {
    setIsClient(true);
    checkLoginStatus();
  }, []);
  return (
    <header className="flex justify-between items-center p-3 pb-5">
      <div></div>
      <Link href="/">
        <div className="font-bold text-red-700 text-3xl">Movies</div>
      </Link>
      <div>
        {isClient &&
          (isLogin ? (
            <div className="flex items-center space-x-2">
              <Link href="/myPage">
                <Image
                  src={userImage}
                  width={20}
                  height={20}
                  alt="userImage"
                  className="rounded-full"
                />
              </Link>
              <Link href="/login/logout">
                <div className="text-neutral-400 text-sm">logout</div>
              </Link>
            </div>
          ) : (
            <Link href="/login">
              <div className="text-neutral-400 text-sm">login</div>
            </Link>
          ))}
      </div>
    </header>
  );
};

export default Header;
