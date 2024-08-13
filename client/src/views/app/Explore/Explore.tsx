import { filterDashboard } from "@/core/lib/types/user.types";
import { useNavigate, useSearchParams } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import ExploreFlashCards from "./ExploreFlashCards";
import ExploreTopics from "./ExploreTopics";

const Explore = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const filter = params.get("filter") as filterDashboard;
  return (
    <div className="h-full w-full flex flex-col justify-start items-start p-6">
      <div className="w-full flex items-center justify-between">
        <p className="text-4xl font-poppins font-medium">Explore !</p>
      </div>
      <div className="text-3xl font-poppins w-full flex items-end justify-start gap-3 mt-4">
        <p
          onClick={() => {
            const params = new URLSearchParams({ filter: "topics" });
            navigate(`/explore?${params}`);
          }}
          className={twMerge(
            "text-lg text-dark cursor-pointer hover:text-pink-500 mr-2",
            filter !== "flashcards" && "text-pink-500"
          )}
        >
          Topics
        </p>
        <p
          onClick={() => {
            const params = new URLSearchParams({ filter: "flashcards" });
            navigate(`/explore?${params}`);
          }}
          className={twMerge(
            "text-lg text-dark cursor-pointer hover:text-yellow-400",
            filter === "flashcards" && "text-yellow-400"
          )}
        >
          FlashCards
        </p>
      </div>
      <div className="h-full w-full py-4">
        {filter === "flashcards" ? <ExploreFlashCards /> : <ExploreTopics />}
      </div>
    </div>
  );
};

export default Explore;
