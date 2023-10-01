import Image from "next/image";
import likesButtonImgage from "../public/likesButtonImage.svg";
import { useEffect, useState } from "react";
import { User } from "./useAuthToken";
import axios from "axios";
import { fetchUserLikeStatus } from "@/pages/api/user";

interface LikesButtonProps {
  movieId: string;
  user: User | null;
}

const LikesButton: React.FC<LikesButtonProps> = ({ movieId, user }) => {
  const [isLike, setIsLike] = useState(false);

  useEffect(() => {
    const fetchLikeStatus = async () => {
      if (user) {
        const userLikeStatus = await fetchUserLikeStatus(
          movieId,
          String(user.id)
        );
        if (userLikeStatus) {
          setIsLike(true);
        }
      }
    };
    fetchLikeStatus();
  }, [user]);

  const fetchAddLike = async (movieId: string, userId: string) => {
    try {
      const response = await axios.post("http://127.0.0.1:8080/user/likes", {
        movieId: movieId,
        userId: userId,
      });

      if (response.data.success) {
        alert(`${response.data.message}`);
      } else {
        console.error("server Error:", response.data.message);
      }
    } catch (error) {
      console.error("Failed to add like:", error);
    }
  };

  const fetchRemoveLike = async (movieId: string, userId: string) => {
    try {
      const response = await axios.delete("http://127.0.0.1:8080/user/likes", {
        data: {
          movieId: movieId,
          userId: userId,
        },
      });

      if (response.data.success) {
        alert(`${response.data.message}`);
      } else {
        console.error("server Error:", response.data.message);
      }
    } catch (error) {
      console.error("Failed to remove like:", error);
    }
  };

  const handleLikeToggle = () => {
    if (!user) {
      alert("해당 기능은 로그인이 필요합니다.");
      return;
    }

    if (isLike) {
      //좋아요 취소 API 호출
      fetchRemoveLike(movieId, String(user.id));
    } else {
      //좋아요 추가 API 호출
      fetchAddLike(movieId, String(user.id));
    }
    setIsLike(!isLike);
  };

  return (
    <button onClick={handleLikeToggle}>
      <div className="w-10 h-10 relative">
        <Image
          src={likesButtonImgage}
          layout="fill"
          objectFit="cover"
          alt="likesButton"
          className={isLike ? "" : "grayscale"}
        />
      </div>
    </button>
  );
};

export default LikesButton;
