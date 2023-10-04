import { useState } from "react";
import Tab from "./Tab";
import TabPanel from "./TabPanel";
import { User } from "./useAuthToken";
import ReviewContent from "./ReviewContent";
import ReviewForm from "./ReviewForm";

interface ReviewTabContainerProps {
  movieId: string;
  user: User | null;
}

const ReviewTabContainer: React.FC<ReviewTabContainerProps> = ({
  movieId,
  user,
}) => {
  const [selectedTab, setSelectedTab] = useState("reviews");

  return (
    <div className="flex flex-col flex-wrap max-w-screen-lg mx-auto p-2">
      <div>
        <Tab
          name="reviews"
          selectedTab={selectedTab}
          onSelect={() => setSelectedTab("reviews")}
        >
          <span className="p-2">작성된 리뷰</span>
        </Tab>
        {user && (
          <Tab
            name="writeReview"
            selectedTab={selectedTab}
            onSelect={() => setSelectedTab("writeReview")}
          >
            <span className="p-2">리뷰 작성하기</span>
          </Tab>
        )}
      </div>

      <div>
        <TabPanel name="reviews" selectedTab={selectedTab}>
          <ReviewContent movieId={movieId} />
        </TabPanel>
        {user && (
          <TabPanel name="writeReview" selectedTab={selectedTab}>
            <ReviewForm movieId={movieId} user={user} />
          </TabPanel>
        )}
      </div>
    </div>
  );
};

export default ReviewTabContainer;
