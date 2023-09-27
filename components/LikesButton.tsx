import Image from "next/image";
import likesButtonImgage from "../public/likesButtonImage.svg";
import { useAuthToken } from "./useAuthToken";

interface LikesButtonProps {
  movieId: string;
}

const LikesButton: React.FC<LikesButtonProps> = ({ movieId }) => {
  const { user } = useAuthToken();
  

  return (
    <button className="">
      <div className="w-10 h-10 relative">
        <Image
          src={likesButtonImgage}
          layout="fill"
          objectFit="cover"
          alt="likesButton"
        />
      </div>
    </button>
  );
};

export default LikesButton;
