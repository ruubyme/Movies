import kakaoLoginLogo from "../../public/kakao_login_large_wide.png";
import Image from "next/image";

const Login: React.FC = () => {
  const REST_API_KEY = process.env.NEXT_PUBLIC_KAKAOLOGIN_APPKEY;
  const KAKAO_REDIRECT_URI = "http://localhost:3000/login/kakao";
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&scope=profile_nickname`;
  const loginHandler = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="flex flex-col bg-white px-6 py-10 rounded">
        <div className="text-gray-700 mb-2 pb-20 text-3xl text-center">
          kakao
        </div>
        <div className="text-gray-500 mb-4 text-center pb-3 text-sm">
          계정과 비밀번호 입력없이<br></br> 카카오톡으로 로그인 해 보세요.
        </div>
        <button type="button" onClick={loginHandler}>
          <Image
            src={kakaoLoginLogo}
            width={250}
            height={100}
            alt="카카오 로그인"
          />
        </button>
      </div>
    </div>
  );
};

export default Login;
