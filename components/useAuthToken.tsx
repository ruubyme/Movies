import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { parseCookies } from "nookies";
import axios from "axios";
import jwt_decode from "jwt-decode";

interface DecodedToken {
  sub: number;
  name: string;
}

interface User {
  id: number;
  name: string;
}

/**로그인 유지를 위한 커스텀 훅 */
export const useAuthToken = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const cookies = parseCookies();
    const token = cookies.token;

    if (token) {
      //토큰이 존재할 경우 헤더에 포함시킴
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      //토큰에서 사용자 정보를 추출
      const decodedToken = jwt_decode<DecodedToken>(token);
      setUser({
        id: decodedToken.sub,
        name: decodedToken.name,
      });
    } else {
      //토큰이 없을 경우 헤더에서 제거, 로그인 페이지로 리다이렉트
      delete axios.defaults.headers.common["Authorization"];
      router.push("/login");
    }
  }, []);
  console.log(user);
  return { user };
};
