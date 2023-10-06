import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { flaskAPI } from "../api/index";
import { setCookie } from "nookies";

const KakaoLogin = () => {
  const router = useRouter();
  const { code } = router.query;

  useEffect(() => {
    const sendAuthCode = async () => {
      if (code) {
        try {
          const response = await flaskAPI.post(`/login/kakao?code=${code}`);
          const token = response.data.token;
          const nickname = response.data.nickname;

          //쿠키에 저장
          if (token) {
            setCookie(null, "token", token, { path: "/" });
            alert(`${nickname}님 환영합니다.`);
            router.push("/").then(() => {
              window.location.reload();
            });
          } else {
            throw new Error("No token received");
          }
        } catch (error) {
          console.error("Error", error);
          alert("로그인에 실패하였습니다. 다시 시도해 주세요.");
          router.push("/login");
        }
      }
    };
    sendAuthCode();
  }, [code]);

  return null;
};

export default KakaoLogin;
