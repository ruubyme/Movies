import { useAuthToken } from "@/components/useAuthToken";

const MyPage: React.FC = () => {
  const { user } = useAuthToken();
  const userName = user?.name;

  return (
    <div>
      <div className="text-white">{`${userName}님의 MyPage`}</div>
      <div>
        <div className="text-white">찜한 목록</div>
        <div className="text-white">작성한 리뷰</div>
      </div>
    </div>
  );
};

export default MyPage;
